import axios from "axios";
// Set default validation status for Axios
axios.defaults.validateStatus = function (status) {
  // Return true if status is between 200 and 300 inclusive
  return status >= 200 && status < 300;
};
// Create a new Axios instance with base URL and timeout
const diffusion = axios.create({
//   baseURL: "/sdApi",
  baseURL: 'http://localhost:3005/',
  timeout: 100000,
});

// 添加请求拦截器 xd 
diffusion.interceptors.request.use();

// 添加响应拦截器 xd 
diffusion.interceptors.response.use();
// Función para obtener todos los usuarios
// aca creas las funciones como en el proeject
// /inventory-management/find-all-inventories copias esas rutas 

export const getAllinventory = () => {
    return diffusion.get('/inventory-management/find-all-inventories');
  };
  
export const searchInventoryByName = (inventory_name?: any) => {
    return diffusion.get("/inventory-management/find-one-inventory", { params: { inventory_name: inventory_name } })
};

export const getInventoryByRackId = (rack_id?: any) => {
  return diffusion.get("/inventory-management/get-inventory-by-rack-id", { params: { rack_id: rack_id } })
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
  