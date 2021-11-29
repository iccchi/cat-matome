import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CatDataProvider from './store/CatDataProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserProvider from './store/UserProvider';

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#ffe0b2",
    },
　　secondary: {
      main: "#76ff03",
    },
    info: {
      main: "#263238"
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CatDataProvider>
    <UserProvider>
      <ThemeProvider theme={myTheme}>
        <App />
      </ThemeProvider>
    </UserProvider>
    </CatDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
