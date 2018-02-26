import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require('isomorphic-fetch');

const hasToken = localStorage.getItem("token") !== null;

process.env.REACT_APP_TOKEN_URL || "http://localhost:4000/q/graphql"

if(hasToken)
  ReactDOM.render(<App />, document.getElementById('root'));
else
  fetch(`#{process.env.APP_URL}/guest_token`)
    .then( (resp) => resp.json() )
    .then( (json) => {
      localStorage.setItem("token", json["token"])
      ReactDOM.render(<App />, document.getElementById('root'));
    });

registerServiceWorker();


