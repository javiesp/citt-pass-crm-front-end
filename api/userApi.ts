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

export const userLogin = (loginAuthDto?: any) => {
  return diffusion.post('/users/login', loginAuthDto );
};

// Función para obtener todos los usuarios
export const getAllUsers = (proyect_id: any) => {
  return diffusion.get('users/find-all-users', { params: { proyect_id } });
};

export const createUser = (createUserDto?: any) => {
  console.log(createUserDto);
  return diffusion.post('/roles/create-roles', createUserDto );
};
