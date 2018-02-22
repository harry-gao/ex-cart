import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const setupUser = ()=>
{
  localStorage.setItem("token", "guest123")
} 

setupUser()
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


