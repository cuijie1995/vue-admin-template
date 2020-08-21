import request from '@/utils/serequest'

// 获取token
export function GetToken(data) {
  return request({
    url: '/api/token',
    method: 'post',
    data
  })
}

// 获取门户头部数据

export function GetHomeData(data) {
  return request({
    url: '/api/BusinessInformation/GetHomeData?ClientID=' + data,
    method: 'get',
    data
  })
}

// 获取银行汇率
export function GetRateNow(data) {
  return request({
    url: '/api/BusinessInformation/GetRateNow',
    method: 'get',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data
  })
}


// 获取海关汇率
export function GetCstRate(data) {
  return request({
    url: '/api/BusinessInformation/GetCstRate',
    method: 'get',
    data
  })
}


// 获取每日汇率
export function Getexchangerates(data) {
  return request({
    url: '/api/BusinessInformation/Getexchangerates',
    method: 'get',
    data
  })
}


// 订单跟踪
export function GetOrderStatus(data) {
  return request({
    url: '/api/ErpApi/GetOrderStatus',
    method: 'post',
    data
  })
}


// 订单物流详情
export function GetOrderLogistics(data) {
  return request({
    url: '/api/ErpApi/GetOrderLogistics',
    method: 'get',
    params: data
  })
}

//   订单资金详情
export function GetOrderCaoitalflows(data) {
  return request({
    url: '/api/ErpApi/GetOrderCaoitalflows',
    method: 'get',
    params: data
  })
}



//   库存查询
export function GetStocks(data) {
  return request({
    url: '/api/ErpApi/GetStocks',
    method: 'post',
    data
  })
}



// 对账单查询
export function GetApbalance(data) {
  return request({
    url: '/api/ErpApi/GetApbalance',
    method: 'post',
    data
  })
}

// 对账单详情
export function GetApbalanceDetailed(data) {
  return request({
    url: '/api/ErpApi/GetApbalanceDetailed?oid=' + data,
    method: 'get',
    data
  })
}

// 付款单信息
export function GetBankTrans(data) {
  return request({
    url: '/api/ErpApi/GetBankTrans',
    method: 'post',
    data
  })
}




// 进项发票
export function GetInputInv(data) {
  return request({
    url: '/api/ErpApi/GetInputInv',
    method: 'post',
    data
  })
}

// 销项发票
export function GetSalesInv(data) {
  return request({
    url: '/api/ErpApi/GetSalesInv',
    method: 'post',
    data
  })
}

// 核销详情
export function GetVerificattons(data) {
  return request({
    url: '/api/ErpApi/GetVerificattons?BankId=' + data,
    method: 'get',
    data
  })
}