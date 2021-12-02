import React, { useContext, useEffect, useState } from 'react'
import { fetchNekoData,fetchRandomNekoData } from '../apis'
import { Header } from '../component/header'
import { CatStore } from '../store/CatDataProvider'
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LikeIcon } from '../component/LikeIcon';
import { ThumnailList } from '../component/ThumnailList';



export const TopPage = () => {

  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const [currentCatMovie, setCurrentCatMovie] = useState(null)
  
  useEffect(()=>{
    const getfetchneko = async() =>{
      await fetchNekoData().then((res)=>{
        setGlobalCatState({type: 'SET_CATDATAS', payload: {catDatas: res.data.items}})
       })
    }
    getfetchneko()
  }, [])

  useEffect(()=>{
    setCurrentCatMovie(globalCatState.catDatas[0])
  },[globalCatState])

  console.log(currentCatMovie)
  return (
    <>
    <Header />
    <Container sx={{marginTop: 2}}>
      {
        currentCatMovie ? (
            <>
            <YouTube videoId={currentCatMovie.id.videoId} className={style.iframe} containerClassName={style.youtube}/>
            <Grid container>
              <Grid item xs>
                <Typography>{currentCatMovie.snippet.title}</Typography>
              </Grid>
              <Grid item>
                <LikeIcon video={currentCatMovie}/>
              </Grid>
            </Grid>
            </>
        ):(
          <div>Loading</div>
        )
      }
      <ThumnailList setCurrentCatMovie={setCurrentCatMovie}/>
    </Container>
    </>
  )
}
