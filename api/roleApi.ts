import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
  baseURL: 'https://citt-pass-api-gateaway-backend-production.up.railway.app',
  // baseURL: 'http://localhost:3005/',
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
export const getAllUsersById = (proyect_id: any) => {
  return diffusion.get('users/find-users-by-project', { params: { "proyect_id": proyect_id } });
};

// Función para obtener todos los usuarios
export const getAllUsersByMail = (email: string) => {
  return diffusion.get('/users/find-one-user-by-mail', { params: { "email": email } });
};

// Función para obtener todos los usuarios
export const getAllUsers = () => {
  return diffusion.get('users/find-all-users');
};

export const getChecklist = (proyect_id: any) => {
  return diffusion.get('users/find-all-users', { params: { proyect_id } });
};

export const createUser = (createUserDto?: any) => {
  console.log(createUserDto);
  return diffusion.post('/users/create-user', createUserDto );
};

export const updateUser = (id: string, updateUserDto: any) => {
  console.log(updateUserDto);
  return diffusion.put(`/users/update-user/${id}`, updateUserDto); 
};

export const updateUserPassword = (id: string, updateUserDto: any) => {
  console.log(updateUserDto);
  return diffusion.put(`/users/update-user-password/${id}`, updateUserDto );
};

export const deleteUser = (id: any) => {
  return diffusion.delete('/users/delete-user/'+id);
};

//  ROLE

export const createRole = (createRoleDto: any) => {
  return diffusion.post('/role/create-role', createRoleDto);
};

export const getAllRoles = () => {
  return diffusion.get('/role/find-all-roles');
};

export const getRoleById = (id: any) => {
  return diffusion.get(`/role/find-one-role/${id}`);
};

export const getRoleByRoleId = (role_id: any) => {
  return diffusion.get('/role/find-one-roleid', { params: { role_id } });
};

export const updateRole = (id: any, updateRoleDto: any) => {
  return diffusion.put(`/role/update-role/${id}`, updateRoleDto);
};

export const deleteRole = (id: any) => {
  return diffusion.delete(`/role/delete-role/${id}`);
};

// USER ROL

export const createUserRole = (createUserRoleDto: any) => {
  return diffusion.post('/user-role/create-user-role', createUserRoleDto);
};

export const getAllUserRoles = () => {
  return diffusion.get('/user-role/find-all-user-roles');
};

export const getUserRoleById = (id: any) => {
  return diffusion.get(`/user-role/find-one-user-role/${id}`);
};

export const getUserRoleByUID = (uid_user: any) => {
  return diffusion.get('/user-role/find-one-user-role-uid', { params: { uid_user } });
};

export const updateUserRole = (id: string, updateUserRoleDto: any) => {
  return diffusion.put('/user-role/update-user-role/'+id, updateUserRoleDto);
};

export const deleteUserRole = (id: any) => {
  return diffusion.delete(`/user-role/delete-user-role/${id}`);
};
