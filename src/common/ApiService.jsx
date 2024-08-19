import axios from "axios"

const AxiosService = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}`,
    headers:{
        'Content-Type': "application/json",
    }
    
})
// console.log('Api Url:',import.meta.env.VITE_API_URL);

AxiosService.interceptors.request.use(config=>{
    const token = sessionStorage.getItem('token')
    if(token)
        config.headers.Authorization = `Bearer ${token}` 
    return config;
})

export default AxiosService;
