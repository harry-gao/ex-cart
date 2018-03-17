import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import {UpsertAddressMutation, AddressesQuery, AddressQuery} from '../queries'
import Address from './Address'
import Loading from '../Loading/Loading';


// const upsertAddressMutation = graphql(UpsertAddressMutation, {
//   props: ({ ownProps, mutate }) => ({
//     upsertAddress: (addressInput) => mutate({ variables: { addressInput } }),
//   }),
//   options: {
//     update: (proxy, { data: { upsertAddress } }) => {
//       // Read the data from our cache for this query.
//       const data = proxy.readQuery({ query: AddressesQuery });

//       // Add our todo from the mutation to the end.
//       data.addresses = data.addresses.map(a => a.id == upsertAddress.id ? upsertAddress : a);

//       // Write our data back to the cache.
//       proxy.writeQuery({ query: AddressesQuery, data });
//     },
//   }
// })

const EditAddress = ({ data: {loading, error, address }, history, upsertAddress}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <Address address={address} upsertAddress={upsertAddress} history={history}/>
};

const EditAddressHOC =  compose(
  withApollo,
  withRouter,
  graphql(AddressQuery, {
    options: (props) => ({ 
      variables: { addressId: parseInt(props.match.params.id, 10) } }),
  })
)(EditAddress)

export default EditAddressHOC