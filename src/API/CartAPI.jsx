import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: () => {
    const url = `/carts`;
    return axiosClient.get(url);
  },

  postAddToCart: (cart) => {
    console.log("post add cart");

    console.log("cart");
    console.log(cart);
    const url = `/carts/addCart`;
    return axiosClient.post(url, cart);
  },

  deleteToCart: (productId) => {
    const url = `/carts/deleteProductCart/${productId}`;
    return axiosClient.delete(url);
  },

  putToCart: ({ productId, quantity }) => {
    const url = `/carts/updateCart`;
    return axiosClient.put(url, { productId, quantity });
  },
};

export default CartAPI;
