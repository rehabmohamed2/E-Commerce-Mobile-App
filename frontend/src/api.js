import axios from 'axios';

const BASE_URL = 'http://192.168.1.24:3000/api';

export const authAPI = {
  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  login: async (credentials) => {
    try {
      console.log('Sending login request with:', credentials); // ADD THIS
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      console.log('Login response:', response.data); // AND THIS
      return response.data;
    } catch (error) {
      console.error('Login error:', error); // ADD THIS TOO
      throw error.response?.data || error.message;
    }
  },
};

export const productAPI = {
  // Fetch all products
  getProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data.data.products;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getProductById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data.data.product;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  productSearch: async (search) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?search=${search}`);
      return response.data.data.products;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};



export const cartAPI = {
  checkout: async (checkoutData) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/checkout`, checkoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getTransactions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/transaction`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getTransactionById: async (transactionId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}); 