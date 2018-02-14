import React from 'react';
import './Home.css'
import ProductListWithData from '../ProductList/ProductList'
import HomeFooter from '../HomeFooter/HomeFooter'


const Home = () => {
  return  <div className="site">
            <div className="header">
            </div>
            <div className="main">
              <ProductListWithData />
            </div>
            <div className="footer">
              <HomeFooter/>
            </div>
          </div>  ;
};

export default Home;