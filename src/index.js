import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import { firebase } from './firebase';


const App = (props) => {
  return(
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>    
  )
}

firebase.auth().onAuthStateChanged((user)=>{
  //as we are logged in we can use this prop to get the private and public routes
  ReactDOM.render(<App user={user}/>,document.getElementById('root'));
})




