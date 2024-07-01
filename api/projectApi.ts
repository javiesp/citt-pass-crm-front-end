import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
    baseURL: 'https://citt-pass-api-gateaway-backend-production.up.railway.app',
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
export const getAllProjects = () => {
    return diffusion.get('/project/get-project');//Listar
};

export const deleteProject = (id: any) => {
  return diffusion.delete('/project/delete-project/'+id);// elimianar
};

export const updateProject = (id: string, updateProjectDto?: any) => {
  console.log(updateProjectDto);
  return diffusion.put('/project/update-project/'+id, updateProjectDto);// actualizar 
};

export const createProject = (createProjectDto?: any) => {
  console.log(createProjectDto);
  return diffusion.post('/project/create-project', createProjectDto );// crear
};

export const searchProjectByName = (project_name?: any) => {
  return diffusion.get("/project/search-project-by-name", { params: { project_name: project_name } }); // barra de busqeudas
};