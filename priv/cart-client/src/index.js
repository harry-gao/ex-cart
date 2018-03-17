import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/react-slick.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import initReactFastclick from 'react-fastclick';
require('isomorphic-fetch');

initReactFastclick();

const hasToken = localStorage.getItem("token") !== null;

if(hasToken){
  ReactDOM.render(<App />, document.getElementById('root'));
}else{
  alert(`${process.env.REACT_APP_URL}/guest_token`)
  fetch(`${process.env.REACT_APP_URL}/guest_token`)
  .then( (resp) => resp.json() )
  .then( (json) => {
    localStorage.setItem("token", json["token"])
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}


registerServiceWorker();


