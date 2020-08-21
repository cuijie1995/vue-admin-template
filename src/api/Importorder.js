import request from '@/utils/request'
// 添加产品
export function MaterialPoolCreate(data){
  return request({
    url:'/api/services/app/MaterialPool/CreateOrUpdate',
    method:'post',
    data
  })
}
// 添加地址
export function DeliveryAddressCreate(data) {
  return request({
    url: '/api/services/app/DeliveryAddress/CreateOrUpdate',
    method: 'post',
    data
  })
}
// 获得添加的产品
export function Product(data) {
  return request({
    url: '/api/services/app/MaterialPool/GetPaged',
    method: 'get',
    params:data
  })
}
// 省市区联动
export function region(data) {
  return request({
    url: '/api/services/app/DeliveryAddress/GetOptions?id='+ data,
    method: 'get',
    
  })
}
// 获得添加的地址
export function GetAddress(data) {
  return request({
    url: '/api/services/app/DeliveryAddress/GetPaged',
    method: 'get',
    params:data
  })
}


// 根据id查找对应的地址
export function ByIdAddress(data) {
  return request({
    url: '/api/services/app/DeliveryAddress/GetById?id=' + data,
    method: 'get',
    data
  })
}



// 运输方式
export function transport(data){
  return request({
    url:'/api/services/app/Logistics/GetAllLogistics',
    method:'get',
    data
  })
}
// 新增仓库
export function WarehouseCreate(data){
  return request({
    url:'/api/services/app/Warehouse/CreateOrUpdate',
    method:'post',
    data
  })
}
// 获取仓库id
export function WarehouseId(data){
  return request({
    url:'/api/services/app/Warehouse/GetPaged',
    method:'get',
    data
  })
}

// 根据id查找对应的仓库
export function ByIdWarehouse(data) {
  return request({
    url: '/api/services/app/Warehouse/GetById?id=' + data,
    method: 'get',
    data
  })
}



export function ForEdit(data) {
  return request({
    url: '/api/services/app/OrderMaster/GetForEdit',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    method: 'get',
    data,

  })
}

// 上传附件
export function UploadIForm(data){
  return request({
    url:'/api/services/app/Enclosure/UploadIForm',
    method:'post',
    data
  })
}
//通过订单的id来获取上传的附件
export function GetEnclosuresByKey(data){
  return request({
    url:'/api/services/app/Enclosure/GetEnclosuresByKey?id=' + data,
    method:'get',
    data
  })
}
// 通过附件的id来删除附件
export function DeleteEnclosure(data){
  return request({
    url:'/api/services/app/Enclosure/DeleteEnclosure?id=' + data,
    method:'delete',
    data
  })
}
// 通过订单的id批量删除附件
export function DeleteEnclosuresByKey(data){
  return request({
    url:'/api/services/app/Enclosure/DeleteEnclosuresByKey?id=' + data,
    method:'delete',
    data
  })
}


// 通过附件的id来下载查看附件
export function DownLoadEnclosure(data){
  return request({
    url:'/api/File/DownLoadEnclosure?Id=' + data,
    method:'get',
    responseType:"blob",
    data
  })
}



// 模板下载
export function GetOrderTemp(data){
  return request({
    url:'/api/File/GetOrderTemp' ,
    method:'get',
    responseType:"blob",
    data
  })
}

// 模板上传
export function UploadOrderList(data){
  return request({
    url:'/api/services/app/OrderMaster/UploadOrderList',
    method:'post',
    data
  })
}

// 进口订单的提交
export function importorder(data){
  return request({
    url:'/api/services/app/OrderMaster/CreateOrUpdate',
    method:'post',
    headers:{'Content-Type': 'application/json;charset=UTF-8'},
    data
  })
}