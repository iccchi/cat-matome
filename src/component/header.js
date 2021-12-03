import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FormDialog } from './FormDialog';
import { userContext } from '../store/UserProvider';
import { Logout } from './Logout';
import { ToLike } from './ToLike';
import { useHistory } from 'react-router';



export const Header = () => {
  const {currentUser} = React.useContext(userContext)
  const history = useHistory()
  const toTopPage = () => {
    history.push('/')
  }
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={toTopPage}>
            猫まとめ
          </Typography>
          {
            currentUser.id ? (
              <>
              <ToLike />
              <Logout/>
              </>
            ):(<FormDialog />)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}