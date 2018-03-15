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
      address{
        id
        name
        address_line_1
        phone
      }
    }
  }
`;

export const OrdersQuery = gql`
  query OrdersQuery($state: String!) {
    orders(state: $state){
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

 export const AddressQuery = gql`
 query AddressQuery($addressId: Int!) {
  address(id: $addressId){
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

export const UpdateOrderMutation = gql`
  mutation UpdateOrder($order: OrderInput!){
    updateOrder(order: $order){
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
      address{
        id
        name
        address_line_1
        phone
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

export const CreateAddressMutation = gql`
  mutation($address_line_1: String!, $name: String!, $phone: String!){
    createAddress(address_line_1: $address_line_1, name: $name, phone: $phone){
      id
      name
      phone
      address_line_1
    }
  }
`;

export const UpsertAddressMutation = gql`
  mutation upsertAddress($addressInput: AddressInput){
    upsertAddress(address: $addressInput){
      id
      name
      phone
      address_line_1
    }
  }
`;

export const CreateOrderShippingAddressMutation = gql`
  mutation($orderId: Int!, $addressId: Int!){
    createOrderShippingAddress(orderId: $orderId, addressId: $addressId){
      orderId
      address{
        id
        name
        phone
        address_line_1
      }
    }
  }
`;