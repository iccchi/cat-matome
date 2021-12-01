import React, { useContext, useEffect, useState } from 'react'
import { fetchNekoData } from '../apis'
import { Header } from '../component/header'
import { CatStore } from '../store/CatDataProvider'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'
import { Container, Typography } from '@mui/material';

import Grid from '@mui/material/Grid';
import { LikeIcon } from '../component/LikeIcon';
import { ThumnailList } from '../component/ThumnailList';



export const TopPage = () => {

  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const [currentCatThumbnail, setCurrentCatThumbnail] = useState(0)
  const [currentCatMovie, setCurrentCatMovie] = useState(null)
  const [title, setCurrentTitle] = useState('')
  const changeCatMovie = (e) => {
    console.log(e)
    setCurrentCatMovie(globalCatState.catDatas[currentCatThumbnail])
    // setCurrentTitle(globalCatState.catDatas[currentCatThumbnail].snippet.title)
  }
  const changeCatThumbnail = (idx) => {
    console.log(idx)
    setCurrentCatThumbnail(idx)
    setCurrentTitle(globalCatState.catDatas[idx].snippet.title)
  }
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

  console.log(globalCatState)
  return (
    <>
    <Header />
    <Container >
      {
        currentCatMovie ? (
            <>
            <YouTube videoId={currentCatMovie.id.videoId} className={style.iframe} containerClassName={style.youtube}/>
            </>
        ):(
          <div>aaaa</div>
        )
      }
      <Grid container>
        <Grid item xs>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item>
          {
            currentCatMovie && (
              <LikeIcon video={currentCatMovie}/>
            )
          }
        </Grid>
      </Grid>
      <ThumnailList setCurrentCatMovie={setCurrentCatMovie} setCurrentTitle={setCurrentTitle}/>
    {/* <ImageGallery items={globalCatState.catThumbnail} showFullscreenButton={false} showPlayButton={false} onClick={(e)=>changeCatMovie(e)} onSlide={(idx)=>changeCatThumbnail(idx)}/> */}
    </Container>
    </>
  )
}
