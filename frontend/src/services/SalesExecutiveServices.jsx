import { axiosInstance } from './AuthServices';

export const createOrder = async (payload) => {
  const response = await axiosInstance.post("/sales-executive/order", payload);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axiosInstance.get("/sales-executive/user-orders");
  return response.data;
};