import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postOrder: (data) => {
    console.log("postOrder");
    const url = `/orders`;
    return axiosClient.post(url, data);
  },
};

export default CheckoutAPI;
