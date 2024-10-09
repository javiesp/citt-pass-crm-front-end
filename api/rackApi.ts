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


export const getAllrack = () => {
    return diffusion.get('/rack-type/find-all-rack-types');
};

export const deleteRack = (id: any) => {
    return diffusion.delete('/rack-type/delete-rack-type/' + id);
};

export const createRack = (createRackDto?: any) => {
    console.log(createRackDto);
    return diffusion.post('/rack-type/create-rack-type', createRackDto);// crear
};

export const updateRack = (id: any, updateRackDto?: any) => {
    console.log('Datos enviados a la API:', updateRackDto);
    return diffusion.put('/rack-type/update-rack-type/' + id, updateRackDto);
};

