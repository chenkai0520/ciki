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
    auth: 'http://localhost:3000/auth',
    user: 'http://localhost:3000/user',
    blog: 'http://localhost:3000/blog',
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
    
    info() {
        return axios.get(`${baseUrl.user}/info`);
    }
}

const blog = {
    create(content,title,tag){

        if(!content || !tag || !title) return;
        let params = {
            content,tag,title
        }
        return axios.post(`${baseUrl.blog}/`, qs.stringify(params));
    },
    update(content,title,tag){

        if(!content || !tag || !title) return;
        let params = {
            content,tag,title
        }
        return axios.put(`${baseUrl.blog}/`, qs.stringify(params));
    },
    publish(content,title,tag){

        if(!content || !tag || !title) return;
        let params = {
            content,tag,title
        }
        return axios.post(`${baseUrl.blog}/`, qs.stringify(params));
    }
}

export {
    user,
    blog
}