import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Login } from './Login';
import { SignUp } from './SignUp';
import LoginIcon from '@mui/icons-material/Login';
import SvgIcon from '@mui/material/SvgIcon';
export const FormDialog = () => {
  const [open, setOpen] = useState(false)
  const [loginForm, setLoginForm] = useState(true)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginForm(true)
  };

  return (
      <>
      <Button onClick={handleClickOpen} color="info">
        {
          loginForm ? (
            <SvgIcon fontSize="large">
              <LoginIcon/>
            </SvgIcon>
          ):('サインアップ')
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
