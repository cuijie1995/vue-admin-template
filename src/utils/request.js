import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from "js-cookie";
import Router from "../router/index"
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
  //headers:{"Content-Type":"application/json"}
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['token'] = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// let self;
// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    if (res.success) {

      // console.log(res)
      // console.log('res')
      return res;

    } else {
      // console.log(res)
      return res;
    }


  },
  error => {

    console.log(error)

    if (error.response) {
      if (error.response.status == 401) {
        MessageBox.confirm('你的登录已过期，请重新登录', '重新登录', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          Cookies.remove("Token");
          // location.reload()
          var id = localStorage.getItem("tenantName");
          // var tenancyName
          console.log("id")
          Router.push({
            path: "/login",
            query: { tenancyName: id }
          });

          this.$route.query.tenancyName;
        })
      }
    } else if (error.request) {
    } else {
    }
    Message({
      message: error.response.data.error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  },
)

export default service
