import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Container, Typography } from '@mui/material';
import { Login } from './Login';
import { SignUp } from './SignUp';
import Grid from '@mui/material/Grid';


export const FormDialog = () => {
  const [open, setOpen] = useState(false)
  const [loginForm, setLoginForm] = useState(true)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
      <Button variant="outlined" onClick={handleClickOpen} color="info">
        {
          loginForm ? ('ログイン'):('サインアップ')
        }
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {
            loginForm ? (
              <Login setOpen={setOpen} setLoginForm={setLoginForm}/>
            ):(
              <SignUp setOpen={setOpen} setLoginForm={setLoginForm}/>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info">Cancel</Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
