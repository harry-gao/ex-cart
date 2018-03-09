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

export const OrderQuery = gql`
  query OrderQuery($orderId: Int!) {
    order(id: $orderId){
      id,
      state,
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

 export const AddressesQuery = gql`
   query AddressesQuery {
    addresses{
      id
      name
      phone
      address_line_1
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

export const SubmitOrderMutation = gql`
  mutation SubmitOrder($itemIds: [Int]){
    submitOrder(itemIds: $itemIds){
      id
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

export const CreateAddressMutation = gql`
  mutation($address_line_1: String!, $name: String!, $phone: String!){
    createAddress(address_line_1: $address_line_1, name: $name, phone: $phone){
      id
    }
  }
`;

export const CreateOrderShippingAddressMutation = gql`
  mutation($orderId: Int!, $addressId: Integer!){
    createOrderShippingAddress(orderId: $orderId, addressId: $addressId){
      id
    }
  }
`;