import React, { useContext, useEffect, useState } from 'react'
import { fetchNekoData } from '../apis'
import { Header } from '../component/header'
import { CatStore } from '../store/CatDataProvider'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'

export const TopPage = () => {

  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const [currentCatThumbnail, setCurrentCatThumbnail] = useState(0)
  const [currentCatMovie, setCurrentCatMovie] = useState(null)
  const changeCatMovie = (e) => {
    console.log(e)
    setCurrentCatMovie(globalCatState.catDatas[currentCatThumbnail].id.videoId)
  }
  const changeCatThumbnail = (idx) => {
    console.log(idx)
    setCurrentCatThumbnail(idx)
  }
  useEffect(()=>{
    fetchNekoData().then((res)=>{
      setGlobalCatState({type: 'SET_CATDATAS', payload: {catDatas: res.data.items}})
      setCurrentCatMovie(globalCatState.catDatas[currentCatThumbnail].id.videoId)
     })

  }, [])

  console.log(globalCatState)
  return (
    <>
    <Header />
    {
      globalCatState.catDatas.length > 0 && (
        <YouTube videoId={currentCatMovie} className={style.iframe} containerClassName={style.youtube}/>
      )
    }
    <ImageGallery items={globalCatState.catThumbnail} showFullscreenButton={false} showPlayButton={false} onTouchStart={(e)=>changeCatMovie(e)} onSlide={(idx)=>changeCatThumbnail(idx)}/>
    <div>
      トップ
    </div>
    </>
  )
}
