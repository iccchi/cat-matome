import React from 'react'
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcon from '@mui/material/SvgIcon';

export const ToLike = () => {
  const history = useHistory()
  const toLikePage = () => {
    history.push('/like/')
  }
   return (
    <>
      <Button  onClick={toLikePage} color="info">
        <SvgIcon>
          <FavoriteIcon/>
        </SvgIcon>
      </Button>
    </>
  )
}
