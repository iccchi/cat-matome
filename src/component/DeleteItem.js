import { Button, SvgIcon } from '@mui/material'
import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {  doc, deleteDoc} from '@firebase/firestore';
import { db } from '../firebase';

export const DeleteItem = ({currentMovie, currentUser, setFavoriteCatList, favoriteCatList}) => {
  const deleteMovie = async() => {
    await deleteDoc(doc(db, 'userlike', String(currentUser.id), 'movieList', currentMovie.id))
      .then(()=>{
        alert('削除しました')
        const aaa = favoriteCatList.filter(movie=> movie.id !== currentMovie.id)
        setFavoriteCatList(aaa)
      })
  }
  
  return (
    <div>
      <Button onClick={deleteMovie}>
        <SvgIcon>
          <DeleteOutlineOutlinedIcon color="info"/>
        </SvgIcon>
      </Button>
    </div>
  )
}
