import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
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

export const userLogin = (loginAuthDto?: any) => {
  return diffusion.post('/users/login', loginAuthDto );
};

// Función para obtener todos los usuarios
export const getAllUsers = (proyect_id: any) => {
  return diffusion.get('users/find-all-users', { params: { proyect_id } });
};

export const getChecklist = (proyect_id: any) => {
  return diffusion.get('users/find-all-users', { params: { proyect_id } });
};

export const createUser = (createUserDto?: any) => {
  console.log(createUserDto);
  return diffusion.post('/roles/create-roles', createUserDto );
};