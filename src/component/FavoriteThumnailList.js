import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

export const FavoriteThumnailList = ({favoriteCatList, setCurrentMovie}) =>  {

  
  const changeCurrentMovie = (idx) => {
    setCurrentMovie(favoriteCatList[idx])
  }
  return (
    <Box sx={{ flexGrow: 1, maxHeight: '50vh'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {favoriteCatList.map((item, idx) => (
          <Grid item xs={2} sm={4} md={4} key={idx}>
          <ImageListItem onClick={()=>changeCurrentMovie(idx)}>
            <img
              src={`${item.snippet.thumbnails.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.snippet.thumbnails.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.snippet.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.snippet.channelTitle}
              position="below"
            />
          </ImageListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}