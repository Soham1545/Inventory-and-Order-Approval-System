import { axiosInstance } from './AuthServices';

export const getUser = async() => {
  const response = await axiosInstance.get('/app/me');
  return response.data;
};

export const fetchHome = async() => {
  const response = await axiosInstance.get('/app/home');
  return response.data;
};