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

export const getAllWishlists = () => {
    return diffusion.get('/wish-list/find-all-wishList-types');
};

export const updateWishlistProducts = (id: any, updateProductDto?: any) => {
    console.log('Datos enviados a la API:', updateProductDto);
    return diffusion.put('/wish-list/update-wishList-product/' + id, updateProductDto);
};

export const updateWishlist = (id: any, updateWishListDto?: any) => {
    console.log("wihslist")
    console.log(updateWishListDto)
    console.log(updateWishListDto.budget)
    return diffusion.put('/wish-list/update-wishList-type/' + id, updateWishListDto);
};

export const createWishlist = (createWishListDto?: any) => {
    return diffusion.post('/wish-list/create-wishList-type', createWishListDto );
};

export const deleteWishlist = (id: any) => {
    return diffusion.delete('/wish-list/delete-wishList-type/'+id);
};
  