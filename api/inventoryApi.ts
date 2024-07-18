import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
  // baseURL: 'https://citt-pass-api-gateaway-backend-production.up.railway.app',
  baseURL: 'http://localhost:3005/',
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

export const getAllinventory = () => {
    return diffusion.get('/inventory-management/find-all-inventories');
  };
  
export const searchInventoryByName = (inventory_name?: any) => {
    return diffusion.get("/inventory-management/find-one-inventory", { params: { inventory_name: inventory_name } })
};

export const getInventoryByRackId = (rack_id: any) => {
  return diffusion.get("/inventory-management/find-inventory-by-rack-id", { params: { "rack_id": rack_id } })
};

export const deleteInventory = (id: any) => {
  return diffusion.delete('/inventory-management/delete-inventory/' + id);
};

  export const createInventory = (createInventoryDto?: any) => {
    console.log(createInventoryDto);
    return diffusion.post('/inventory-management/create-inventory', createInventoryDto );// crear
  };

  export const updateInventory = (id: any, updateInventoryDto?: any) => {
    console.log('Datos enviados a la API:', updateInventoryDto);
    return diffusion.put('/inventory-management/update-inventory/' + id, updateInventoryDto);
  };

  export const getProducts = () => {
    return diffusion.get('https://api-integracion.sbgtech.workers.dev/products');
  };

  export const getWishlist = () => {
    return diffusion.get('https://citt-pass-byteboosdt-api-production.up.railway.app/wishlist/find-all-wishList-types');
  };