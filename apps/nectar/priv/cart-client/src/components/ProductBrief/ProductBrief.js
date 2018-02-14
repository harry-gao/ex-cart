import React from 'react';
import {Link} from 'react-router-dom'
import './ProductBrief.css'
import addIcon from '../../assets/icons/add.png'

const ProductBrief = ({product}) => {
  return <div className="product">
    <img src={product.images[0].thumb} className="image"/>
    <div className="info">
      <div className="title">
        <Link to={ '/products/' + product.id }> { product.name } </Link>
      </div>
      <div className="price"> 
        ￥{product.masterVariant.costPrice}
        <img src={addIcon} className="add"/>
      </div>
    </div>
     
  </div>;
};

export default ProductBrief;