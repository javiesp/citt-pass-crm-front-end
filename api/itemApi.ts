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
export const getAllItems = () => {
  return diffusion.get('/item/find-all-items');
};

export const getItemByInventoryId = (inventory_id : number) => {
  return diffusion.get('/item/find-items-by-inventory', { params: { 'inventory_id' : inventory_id } });
};

export const createItem = (createItemDto?: any) => {
  return diffusion.post('/item/create-item', createItemDto );
};

export const updateItem = (id: string, updateItemDto: any) => {
  return diffusion.put(`/item/update-item/${id}`, updateItemDto); 
};

export const deleteItem = (id: any) => {
  return diffusion.delete('/item/delete-item/'+id);
};