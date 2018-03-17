import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo'
import {ProductQuery, AddToCartMutation} from '../queries'
import Carousel from 'nuka-carousel';
import Loadable from 'react-loading-overlay'

import styles from './ProductDetail.css'
//import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"

class ProductDetail extends Component {
  constructor(props){
    super(props)
    this.state = { loading: false }
    this.handleLoadImage = this.handleLoadImage.bind(this)
  }
  
  handleLoadImage = () => {
    this.carousel.setDimensions()
  }

  handleAddToCart = () =>{
    this.setState({loading: true})
    this.props.onAdd(this.props.data.product.masterVariant.id)
      .then( ()=> this.setState({loading: false}))
  }

  render(){
    const { data: {loading, error, product }, history, onAdd } = this.props
    
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    const settings = {
      autoplay: true,
      swiping: true,
      wrapAround: true
    };

    let images = product.images.map( (i) => <img key={i.id} src={i.mobile} alt='' onLoad={this.handleLoadImage}/>)

    return  (
        <div className={styles.product}>
          <div className={styles.content}>
          <Loadable
            active={this.state.loading}
            spinner={true}
            background={'#19572e'}
            className={styles.loadingOverlay}
            text='加载中...'
            >
              <Carousel {...settings} ref={c => this.carousel = c}>
              {images}
              </Carousel>
              <div className={styles.description} dangerouslySetInnerHTML={{__html: product.description}}>        
              </div>

            </Loadable>
            </div>
          <div className={styles.footer}>
            <div className={styles.info}> 单价: ￥{product.masterVariant.costPrice} </div>
            <div className={styles.submit} onClick={this.handleAddToCart}> 加入购物车 </div>
          </div>
        </div>
      )
  }
}


const addToCartMutation = graphql(AddToCartMutation, {
  props: ({ ownProps, mutate }) => ({
    onAdd: (variantId) => mutate({ variables: { variantId } }),
    ...ownProps
  }),
  options: {
    refetchQueries: [
      'CartCountQuery',
    ],
  },
})

const productQuery = graphql(ProductQuery, {
  options: (props) => ({ 
    variables: { productId: parseInt(props.match.params.id, 10) } }),
})


const ProductDetailHOC = compose(
  productQuery,
  addToCartMutation)(ProductDetail)


export default ProductDetailHOC;