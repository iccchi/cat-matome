import React, { useContext } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CatStore } from '../store/CatDataProvider';

export const ThumnailList = ({setCurrentCatMovie}) =>  {
  const {globalCatState} = useContext(CatStore)
  
  const changeCurrentMovie = (idx) => {
    setCurrentCatMovie(globalCatState.catDatas[idx])
  }
  
  return (
    <Box sx={{ flexGrow: 1, maxHeight: '50vh',overflow: 'auto'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{maxHeight: '50vh'}}>
        {globalCatState.catDatas.map((item, idx) => (
          <Grid item xs={2} sm={4} md={4} key={idx} sx={{width: '50%'}}>
          <ImageListItem onClick={()=>changeCurrentMovie(idx)} sx={{maxWidth: '100%'}}>
            <img
              src={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.snippet.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.snippet.channelTitle}
              position="below"
              sx={{maxWidth: "80%"}}
            />
          </ImageListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}