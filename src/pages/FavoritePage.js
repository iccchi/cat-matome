import React, { useContext, useEffect, useState } from 'react'
import { Header } from '../component/header';
import { Container } from '@mui/material';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { userContext } from '../store/UserProvider';
import { app} from '../firebase';
import { FavoriteThumnailList } from '../component/FavoriteThumnailList';
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { DeleteItem } from '../component/DeleteItem';


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
  useEffect(()=>{
    setCurrentMovie(favoriteCatList[0])
  },[favoriteCatList])

  // const date = new Date().getTime()
  // const minDate = new Date(2012,0,1,12,30).getTime()
  // const afterDate = Math.floor(Math.random()*(date - minDate)) + minDate
  // const beforeDate = afterDate - 1000*60*60*24*30*3
  // console.log(new Date(afterDate).toISOString())
  // console.log(new Date(beforeDate).toISOString())
  
  return (
    <>
    <Header/>
    <Container sx={{marginTop: 2}}> 
    {
      currentUser.id ? (
      <Container sx={{marginTop: 2}}> 
      {
        (favoriteCatList.length>0)&&(currentMovie) && (
          <>
          <YouTube videoId={currentMovie.id} className={style.iframe} containerClassName={style.youtube}/>
          <Grid container>
            <Grid item xs>
              <Typography>{currentMovie.snippet.title}</Typography>
            </Grid>
            <Grid item>
              <DeleteItem currentMovie={currentMovie} currentUser={currentUser} setFavoriteCatList={setFavoriteCatList} favoriteCatList={favoriteCatList}/>
            </Grid>
          </Grid>
          <FavoriteThumnailList favoriteCatList={favoriteCatList} setCurrentMovie={setCurrentMovie} />
          </>
        )
      }
      </Container>
      ):(
        <div>アカウントを作成する</div>
      )
    }
    </Container>
    </>
  )
}
