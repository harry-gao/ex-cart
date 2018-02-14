import React, { Component } from 'react';

import './HomeFooter.css'
import {Link} from 'react-router-dom'

class HomeFooter extends Component {
  render() {
    return (
      <div className="footer">
          <div className="home">
            <Link to='/home'> Home </Link>
          </div>
          <div className="cart">
            <Link to='/cart'> Cart </Link>
          </div>
          <div className="me">
            <Link to='/me'> Me </Link>
          </div>
      </div>
      
    );
  }
}

export default HomeFooter;
