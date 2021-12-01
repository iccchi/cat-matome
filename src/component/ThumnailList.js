import React, { useContext } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { CatStore } from '../store/CatDataProvider';
import { fetchRelatedNekoData } from '../apis';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const ThumnailList = ({setCurrentCatMovie, setCurrentTitle}) =>  {
  const {globalCatState, setGlobalCatState} = useContext(CatStore)

  const getFetchRelatedNeko = async(idx) =>{
    await fetchRelatedNekoData(idx).then((res)=>{
      setGlobalCatState({type: 'SET_CATDATAS', payload: {catDatas: res.data.items}})
     })
  }
  
  const changeCurrentMovie = (idx) => {
    setCurrentCatMovie(globalCatState.catDatas[idx])
    setCurrentTitle(globalCatState.catDatas[idx].snippet.title)
    getFetchRelatedNeko(idx)
  }
  console.log(globalCatState)
  return (
    <Box sx={{ flexGrow: 1, maxHeight: '50vh'}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {globalCatState.catDatas.map((item, idx) => (
          <Grid item xs={2} sm={4} md={4} key={idx}>
          <ImageListItem onClick={()=>changeCurrentMovie(idx)}>
            <img
              src={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format`}
              srcSet={`${item.snippet.thumbnails.high.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
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

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
