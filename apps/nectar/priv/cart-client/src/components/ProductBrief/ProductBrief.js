import React from 'react';
import {Link} from 'react-router-dom'
import styles from './ProductBrief.css'
import addIcon from '../../assets/icons/add.png'
import { getCart } from '../../helpers/CartHelper'

const ProductBrief = ({product, addedCallback}) => {
  return <div className={styles.product}>
    <img src={product.images[0].thumb} className={styles.image}/>
    <div className={styles.info}>
      <div className={styles.title}>
        <Link to={ '/products/' + product.id }> { product.name } </Link>
      </div>
      <div className={styles.price}> 
        ￥{product.masterVariant.costPrice}
        <img src={addIcon} className={styles.add} onClick={()=> handleAdd(product.id, addedCallback)}/>
      </div>
    </div>
     
  </div>;
};

const handleAdd = (variantId, addedCallback) => {
  const cartObj = getCart() || {}
  cartObj[variantId] = (cartObj[variantId] || 0) + 1
  localStorage.setItem('cart', JSON.stringify(cartObj));
  const total = Object.values(cartObj).reduce((a, b) => a + b)
  addedCallback(total)
}
export default ProductBrief;