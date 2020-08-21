import request from '@/utils/request'
// 获得添加的订单
export function getOrderMaster(data) {
  return request({
    url: '/api/services/app/OrderMaster/GetPaged',
    method: 'get',
    data
  })
}
// 删除订单
export function deleteOrderMaster(id) {
  return request({
    url: '/api/services/app/OrderMaster/Delete',
    method: 'delete',
    params: { id }
  })
}
// 批量删除订单
export function BatchDeleteOrderMaster(data) {
  return request({
    url: '/api/services/app/OrderMaster/BatchDelete',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}
// 修改订单
export function UpdateOrderMaster(data) {
  return request({
    url: '/api/services/app/OrderMaster/CreateOrUpdate',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    method: 'post',
    data
  })
}



// // 获得添加的地址
export function GetForEdit(data) {
  return request({
    url: '/api/services/app/OrderMaster/GetForEdit?id=' + data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    method: 'get',

  })
}
