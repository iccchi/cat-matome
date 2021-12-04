import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { SvgIcon } from '@mui/material';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/iccchi/">
        My GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const provider = new GoogleAuthProvider()

export const Login = ({setOpen, setLoginForm}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        alert('ログインしました！')
        setOpen(false)
      })
      .catch((error)=>{
        alert(error.message)
      })
  };

  const guestLogin = () => {
    const email = process.env.REACT_APP_GUEST_USER_EMAIL
    const password = process.env.REACT_APP_GUEST_USER_PASSWORD
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        alert('ログインしました！')
        setOpen(false)
      })
      .catch((error)=>{
        alert(error.message)
      })
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result)=>{
        // This gives you a Google Access Token. You can use it to access Google APIs.
        setOpen(false)
      }).catch((error)=>{
        alert(error)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container>
              <Grid item>
              <Button onClick={()=>setLoginForm(false)}>
                  アカウントを作成する
              </Button>
              </Grid>
              <Grid item>
              <Button onClick={()=>guestLogin()}>
                  ゲストユーザ
              </Button>
              </Grid>
              <Grid item>
              <Button onClick={()=>googleLogin()}>
                <SvgIcon>
                  <GoogleIcon />
                </SvgIcon>
              </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}