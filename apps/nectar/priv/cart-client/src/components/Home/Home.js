import React from 'react';
import styles from './Home.css'
import ProductListWithData from '../ProductList/ProductList'
import HomeFooter from '../HomeFooter/HomeFooter'


const Home = () => {
  return  <div className={styles.site}>
            <div className={styles.header}>
            </div>
            <div className={styles.main}>
              <ProductListWithData />
            </div>
            <div className={styles.footer}>
              <HomeFooter/>
            </div>
          </div>  ;
};

export default Home;