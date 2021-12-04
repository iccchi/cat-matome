import React, { useContext, useEffect, useState } from 'react'
import { fetchRandomNekoData } from '../apis'
import { Header } from '../component/header'
import { CatStore } from '../store/CatDataProvider'
import YouTube from 'react-youtube';
import style from '../Youtube.module.css'
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LikeIcon } from '../component/LikeIcon';
import { ThumnailList } from '../component/ThumnailList';
import { userContext } from '../store/UserProvider';



export const TopPage = () => {

  const {globalCatState, setGlobalCatState} = useContext(CatStore)
  const [currentCatMovie, setCurrentCatMovie] = useState(null)
  const {currentUser} = useContext(userContext)
  useEffect(()=>{
    const getfetchneko = async() =>{
      await fetchRandomNekoData().then((res)=>{
        setGlobalCatState({type: 'SET_CATDATAS', payload: {catDatas: res.data.items}})
       })
    }
    getfetchneko()
    // eslint-disable-next-line 
  }, [])

  useEffect(()=>{
    setCurrentCatMovie(globalCatState.catDatas[0])
  },[globalCatState])


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
              {
                currentUser.id && (
                <Grid item>
                  <LikeIcon video={currentCatMovie}/>
                </Grid>
                )
              }
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
