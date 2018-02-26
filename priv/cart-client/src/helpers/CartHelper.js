export const getCart = () =>{
  const cartStr = localStorage.getItem('cart')
  if(cartStr === null)
    return null;

  return JSON.parse(cartStr);
}
