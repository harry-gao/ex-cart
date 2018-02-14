import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import styles from './HomeFooter.css'


class HomeFooter extends Component {
  render() {
    return (
      <div className={styles.footer}>
          <div className={styles.hoe}>
            <Link to='/home'> Home </Link>
          </div>
          <div className={styles.cart}>
            <Link to='/cart'> Cart </Link>
          </div>
          <div className={styles.me}>
            <Link to='/me'> Me </Link>
          </div>
      </div>
      
    );
  }
}

export default HomeFooter;
