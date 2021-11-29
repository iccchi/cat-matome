import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase';
import { userContext } from '../store/UserProvider';

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
      <Button variant="outlined" onClick={logout} color="info">
        ログアウト
      </Button>
    </>
  )
}
