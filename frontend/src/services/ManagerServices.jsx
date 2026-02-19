import { axiosInstance } from "./AuthServices";

export const getOrders = async () => {
  const response = await axiosInstance.get("/manager/orders");
  return response.data;
};

export const approveOrder = async (orderId) => {
  const response = await axiosInstance.post(`/manager/approve-order/${orderId}`);
  return response.data;
};

export const rejectOrder = async (orderId, comment) => {
  const response = await axiosInstance.post(`/manager/reject-order/${orderId}`, {comment});
  return response.data;
};