import gql from 'graphql-tag';

//QUERIES
export const CartQuery = gql`
  query CartQuery{
    cart{
      items{
        id
        name
        price
        quantity
        variantId
        image
      }
    }
  }
  `;

export const CartCountQuery = gql`
  query CartCountQuery {
    cart{
      count
    }
  }
`;

export const ProductListQuery = gql`
   query ProductListQuery {
    products{
      id
      name
      images{
        thumb
      }
      masterVariant{
        id
        costPrice
      }
    }
   }
 `;

//MUTATIONS
export const UpdateCartMutation = gql`
  mutation UpdateCart($items: [LineItemInput]){
    updateCart(items: $items){
      items{
        id
        name
        price
        quantity
        variantId
        image
      }
    }
  }
`;

export const AddToCartMutation = gql`
  mutation($variantId: Int!){
    addToCart(variantId: $variantId){
      items{
        id
        name
        price
        quantity
        variantId
        image
      }
    }
  }
`;