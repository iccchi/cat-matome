import './App.css';
import { TopPage } from './pages/TopPage';
import {  onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from 'react';
import { auth } from './firebase';
import { userContext } from './store/UserProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FavoritePage } from './pages/FavoritePage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {

  const {setCurrentUser} = useContext(userContext)

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUser({
          id: user.uid
        })
      }else{

      }
    })
    return unSub
  },[])
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/">
        <TopPage />
      </Route>
      <Route path="/like/">
        <FavoritePage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
