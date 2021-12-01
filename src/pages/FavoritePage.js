import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../component/header';
import { Container } from '@mui/material';
import { ThumnailList } from '../component/ThumnailList';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { userContext } from '../store/UserProvider';
import { app} from '../firebase';
import { fetchFavoriteNeko, fetchNekoData } from '../apis';
import { FavoriteThumnailList } from '../component/FavoriteThumnailList';
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'

const db = getFirestore(app)
export const FavoritePage = () => {
  const [favoriteCatList, setFavoriteCatList] = useState([])
  const {currentUser} = useContext(userContext)
  const [currentMovie, setCurrentMovie] = useState(null)
  useEffect(()=>{
    const array = []
    getDocs(collection(db, 'userlike', String(currentUser.id), 'movieList'))
      .then((querySnapshot)=>{
        querySnapshot.forEach(doc=>{
          array.push({id: doc.id, snippet: doc.data()})
        })
        setFavoriteCatList(array)
        setCurrentMovie(array[0])
      })
  },[currentUser.id])
  
  console.log(favoriteCatList)
  console.log(currentMovie)
  return (
    <>
    <Header/>
    <Container>
      {
        (favoriteCatList.length>0)&&(currentMovie) && (
          <>
          <YouTube videoId={currentMovie.id} className={style.iframe} containerClassName={style.youtube}/>

          <FavoriteThumnailList favoriteCatList={favoriteCatList} setCurrentMovie={setCurrentMovie}/>
          </>
        )
      }
    </Container>
    </>
  )
}
