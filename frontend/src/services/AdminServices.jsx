import { axiosInstance } from './AuthServices';

export const inviteUser = async (credentials) => {
  const response = await axiosInstance.post('/admin/invite', credentials);
  return response.data;
};

export const getUsers = async () => {
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};

export const getProducts = async() => {
  const response = await axiosInstance.get('/admin/products');
  return response.data;
};

export const addProduct = async (data) => {
  const response = await axiosInstance.post("/admin/product", data);
  return response.data;
};

export const editProduct = async (sku, data) => {
  const response = await axiosInstance.patch(
    `/admin/product/${sku}`,
    data
  );
  return response.data;
};

export const deleteProduct = async(sku) => {
  const response = await axiosInstance.delete(`/admin/product/${sku}`);
  return response.data;
};