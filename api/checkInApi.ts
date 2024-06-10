import axios from "axios";

// Set default validation status for Axios
axios.defaults.validateStatus = function (status) {
    // Return true if status is between 200 and 300 inclusive
    return status >= 200 && status < 300;
};

// Create a new Axios instance with base URL and timeout
const diffusion = axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 100000,
});

// Obtener el token del almacenamiento local
const accessToken = localStorage.getItem('accessToken');

// Añadir el interceptor para agregar el token a los encabezados de las solicitudes
diffusion.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Añadir interceptores para manejar respuestas (opcional)
// Puedes manejar errores o transformaciones de respuesta aquí si es necesario
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
