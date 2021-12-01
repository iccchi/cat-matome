import  React, { useContext, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {  doc, deleteDoc, setDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { userContext } from '../store/UserProvider';
import { CatStore } from '../store/CatDataProvider';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const LikeIcon = ({video}) => {
  const [like, setLike] = useState(false)
  const {currentUser} = useContext(userContext)
  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const handleLikeChange = async(e) => {
    setLike(e.target.checked)
    if(e.target.checked==true){
      await setDoc(doc(db, 'userlike', String(currentUser.id), 'movieList', video.id.videoId), {
        title: video.snippet.title,
        thumbnails: video.snippet.thumbnails.high
      }).then((docRef)=>{
        console.log(docRef)
        alert('createlike')
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      await deleteDoc(doc(db, 'userlike', String(currentUser.id), 'movieList', video.id.videoId))
    }

  }
 
  useEffect(()=>{

  },[])

  return (
    <Checkbox onChange={handleLikeChange} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
  )
}
