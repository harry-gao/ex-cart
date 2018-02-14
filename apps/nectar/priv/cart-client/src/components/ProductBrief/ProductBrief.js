import React from 'react';
import {Link} from 'react-router-dom'
import styles from './ProductBrief.css'
import addIcon from '../../assets/icons/add.png'

const ProductBrief = ({product}) => {
  return <div className={styles.product}>
    <img src={product.images[0].thumb} className={styles.image}/>
    <div className={styles.info}>
      <div className={styles.title}>
        <Link to={ '/products/' + product.id }> { product.name } </Link>
      </div>
      <div className={styles.price}> 
        ￥{product.masterVariant.costPrice}
        <img src={addIcon} className={styles.add}/>
      </div>
    </div>
     
  </div>;
};

export default ProductBrief;