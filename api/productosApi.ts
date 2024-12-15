import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
  baseURL: 'https://citt-pass-api-gateaway-backend-production.up.railway.app',
//   baseURL: 'http://localhost:3005/',
  timeout: 100000,
});

const accessToken = localStorage.getItem('accessToken');

diffusion.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

diffusion.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

// Función para obtener todos los usuarios
export const getAllProdcut = () => {
  return diffusion.get('/product/find-all-products');
};

export const getProductByItem = (item_id: number) => {
    return diffusion.get('/product/find-product-by-itemid', {
      params: { item_id: item_id }
    });
  };
  

export const createProduct = (createItemDto?: any) => {
  return diffusion.post('/product/create-product', createItemDto );
};

export const updateProduct = (id: string, updateItemDto: any) => {
  return diffusion.put(`/product/update-product/${id}`, updateItemDto); 
};

export const deleteProduct = (id: any) => {
  return diffusion.delete('/product/delete-product/'+id);
};