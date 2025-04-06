import axios from 'axios'
import config from '@/config/config'
import router from '../router' // 导入Vue Router实例

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000,
})

// 请求拦截器：自动添加Token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["token"] = `${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// 响应拦截器：处理401未授权
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // 处理业务逻辑的401（如code=401）
//     if (response.data && response.data.code === 401) {
//       handleUnauthorized();
//     }
//     return response;
//   },
//   (error) => {
//     // 处理HTTP状态码的401
//     if (error.response && error.response.status === 401) {
//       handleUnauthorized();
//     }
//     return Promise.reject(error);
//   }
// );

// 统一处理未授权逻辑
// function handleUnauthorized() {
//   // 清除Token及过期时间
//   localStorage.removeItem("token");

//   // 跳转到登录页，携带当前路由路径以支持登录后跳回
//   router.push({
//     path: "/login",
//     query: { redirect: router.currentRoute.fullPath },
//   });
// }

export default axiosInstance
