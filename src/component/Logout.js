import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { userContext } from '../store/UserProvider';
import SvgIcon from '@mui/material/SvgIcon';
import LogoutIcon from '@mui/icons-material/Logout';

export const Logout = () => {
  const {setCurrentUser} = useContext(userContext)
  const logout = async() => {
    await signOut(auth).then(()=>{
      alert('ログアウトしました')
      setCurrentUser({
        id: null
      })
    })
  }
  return (
    <>
      <Button  onClick={logout} color="info">
        <SvgIcon>
          <LogoutIcon />
        </SvgIcon>
      </Button>
    </>
  )
}
