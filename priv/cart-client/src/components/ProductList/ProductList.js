import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import ProductBriefContainer from '../ProductBrief/ProductBrief'
import styles from './ProductList.css'
import {ProductListQuery} from '../queries'
import Loadable from 'react-loading-overlay'

class ProductList extends Component{
  constructor(props){
    super(props)
    this.state = { loading: false }
    
    this.loadingStart = this.loadingStart.bind(this)
    this.loadingEnd = this.loadingEnd.bind(this)
  }

  loadingStart(){
    this.setState({loading: true})
  }

  loadingEnd(){
    this.setState({loading: false})
  }

  render(){
    const { data: {loading, error, products }} = this.props
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <Loadable
        active={this.state.loading}
        spinner={true}
        background={'#19572e'}
        className={styles.loadingOverlay}
        text='购物车加载中...'
        >
        <div className={styles.list}>
          { products.map( p => <ProductBriefContainer 
                                product={p} 
                                key={p.id} 
                                loadingStart={this.loadingStart}
                                loadingEnd={this.loadingEnd}/> ) }
        </div>
      </Loadable>
    )
  }
}
const ProductListWithData = graphql(ProductListQuery)(ProductList);


export default ProductListWithData;