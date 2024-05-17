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
export const getAllProjects = () => {
    return diffusion.get('/project/get-projects');//Listar
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


