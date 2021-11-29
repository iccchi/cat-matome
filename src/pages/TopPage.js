import React, { useContext, useEffect, useState } from 'react'
import { fetchNekoData } from '../apis'
import { Header } from '../component/header'
import { CatStore } from '../store/CatDataProvider'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'
import { Container } from '@mui/material';
import { Box, height } from '@mui/system';
import { FormDialog } from '../component/FormDialog';

export const TopPage = () => {

  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const [currentCatThumbnail, setCurrentCatThumbnail] = useState(0)
  const [currentCatMovie, setCurrentCatMovie] = useState(null)
  const [title, setCurrentTitle] = useState('')
  const changeCatMovie = (e) => {
    console.log(e)
    setCurrentCatMovie(globalCatState.catDatas[currentCatThumbnail].id.videoId)
    // setCurrentTitle(globalCatState.catDatas[currentCatThumbnail].snippet.title)
  }
  const changeCatThumbnail = (idx) => {
    console.log(idx)
    setCurrentCatThumbnail(idx)
    setCurrentTitle(globalCatState.catDatas[idx].snippet.title)
  }
  useEffect(()=>{
    fetchNekoData().then((res)=>{
      setGlobalCatState({type: 'SET_CATDATAS', payload: {catDatas: res.data.items}})
     })

  }, [])

  console.log(globalCatState)
  return (
    <>
    <Header />
    <Container >
      {
        globalCatState.catDatas.length > 0 && (
            <>
            <YouTube videoId={currentCatMovie} className={style.iframe} containerClassName={style.youtube}/>
            </>
        )
      }
      <Box sx={{ mx: "auto", width: '60vw', height:'30vh'}}>
        <Box sx={{ color: 'text.secondary' }}>{title}</Box>
        <ImageGallery items={globalCatState.catThumbnail} showFullscreenButton={false} showPlayButton={false} onClick={(e)=>changeCatMovie(e)} onSlide={(idx)=>changeCatThumbnail(idx)}/>
      </Box>
    </Container>
    </>
  )
}
