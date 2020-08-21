import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service2 = axios.create({
  baseURL: process.env.VUE_APP_BASE_API2, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
  //headers:{"Content-Type":"application/json"}
})

// request interceptor
service2.interceptors.request.use(
  config => {
    config.headers['token'] = getToken()
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service2.interceptors.response.use(

  response => {
    // console.log(response)
    const res = response.data
    // console.log(res)
    if (res) {
      return res;
    } else {
      // Message({
      //   message: res.error.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }


  },
  error => {
    // console.log(error)
    // console.log("2222222222222222222222")
    // console.log(error) // for debug

    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  },
)

export default service2
