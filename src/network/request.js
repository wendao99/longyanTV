import axios from "axios"
import Cookies from 'js-cookie'

export function request(config) {
  const instance = axios.create({
    withCredentials: true,
    baseURL: "api",
    timeout: 15000
  })

  instance.interceptors.request.use(config => {
    if(!config.params) config.params = {};
    config.params.cookies = `MUSIC_U=${Cookies.get('MUSIC_U')};`;
    return config;
  }, error => {
    console.log(error)
    Promise.reject(error)
  });

  instance.interceptors.response.use(res => {
    return res.data
  })

  return instance(config)
}