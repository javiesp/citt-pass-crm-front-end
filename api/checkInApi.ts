import axios from "axios";

axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
};

const diffusion = axios.create({
    baseURL: 'https://citt-pass-api-gateaway-backend-production.up.railway.app',
    timeout: 100000,
});

// Obtener el token del almacenamiento local
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
export const getAllcheckIn = () => {
    return diffusion.get('/check-in/find-all-check-in');
};

export const getCheckInByDateRange = async (startDate: string, endDate: string) => {
    try {
        const response = await diffusion.get(`/check-in/find-by-date-range?startDate=${startDate}&endDate=${endDate}`);
        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        console.error("Error obteniendo check-ins por fecha:", error);
        throw error; 
    }
};

export const createProject = (createCheckInDto?: any) => {
    console.log(createCheckInDto);
    return diffusion.post('/check-in/create-check-in', createCheckInDto );
};