import request from '@/utils/request'

export function tenantlogin(data){
  return request({
    url:'/api/services/app/Account/IsTenantAvailable',
    method:'post',
    data
  })
}

// 获取tenant
export function getTenant(data){
  return request ({
    url:'/api/services/app/Tenant/GetAll',
    method:'get',
    data
  })
}


// 根据id查找tenant
export function findTenant(data){
  return request ({
    url:'/api/services/app/Tenant/Get',
    method:'get',
    data
  })
}

export function login(data,TenantId) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    headers:{"Abp.TenantId":TenantId},
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
