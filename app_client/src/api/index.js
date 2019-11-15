import axios from 'axios'
import qs from 'qs'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    // return Promise.reject(error);
    console.log(error);
    return null;
});

// 通过 instance 统一捕捉错误，使用时不需要再次 try catch
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    // return Promise.reject(error);
    console.log(error);
    return null;
});
axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');

const baseUrl = {
    auth: 'http://localhost:3000/auth'
}


const user = {
    register(userName, userPassword) {
        let params = {
            name: userName,
            password: userPassword
        }
        return axios.put(`${baseUrl.auth}/register`, qs.stringify(params));
    },
    login(userName, userPassword) {
        let params = {
            name: userName,
            password: userPassword
        }
        return axios.post(`${baseUrl.auth}/login`, qs.stringify(params));
    },
    shell(){
        return axios.get(`http://localhost:3000/shell?data=ls`);
    },
    info(){
        return axios.get(`http://localhost:3000/user/info`);
    }
}

export {
    user
}