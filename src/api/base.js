import request from '@/utils/request'

export function GetAllCode(query) {
    return request({
        url: '/api/services/app/Code/GetAllCodeDatas',
        method: 'get',
        params: query
    })
}
export function getCodeDetail(data) {
    return request({
        url: '/api/services/app/Code/GetCodeDatas',
        method: 'get',
        params: data
    })
}
export function createorupdateSupplier(data) {
    return request({
        url: '/api/services/app/Supplier/CreateOrUpdate',
        method: 'post',
        data
    })
}
export function getSupplier(data) {
    return request({
        url: '/api/services/app/Supplier/GetPaged',
        method: 'get',
        params: data
    })
}

export function GetForEdit(data) {
    return request({
        url: '/api/services/app/Supplier/GetForEdit?id=' + data,
        method: 'get',
        data
    })
}

export function GetById(data) {
    return request({
        url: '/api/services/app/Supplier/GetById?id=' + data,
        method: 'get',
        data
    })
}



export function deleteSupplier(id) {
    return request({
        url: '/api/services/app/Supplier/Delete',
        method: 'delete',
        params: { id }
    })
}
export function BatchDeleteSupplier(data) {
    return request({
        url: '/api/services/app/Supplier/BatchDelete',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data
    })
}
export function searchSupplier(data) {
    return request({
        url: '/api/services/app/Supplier/GetPaged',
        headers: { 'Content-Type': 'application/json' },
        method: 'get',
        params: data
    })
}

// 终端客户的获取以及查找
export function getEndCustomer(data) {
    return request({
        url: '/api/services/app/EndCustomer/GetPaged',
        method: 'get',
        params: data
    })
}
// 终端客户的增加以及修改
export function CreateOrUpdateEndCustomer(data) {
    return request({
        url: '/api/services/app/EndCustomer/CreateOrUpdate',
        method: 'post',
        data
    })
}
export function getUpdate(data) {
    return request({
        url: '/api/services/app/EndCustomer/GetForEdit?id=' + data,
        method: 'get',
        data
    })
}

// 根据id查找对应的终端客户
export function ByIdEndCustomer(data) {
    return request({
        url: '/api/services/app/EndCustomer/GetForEdit?id=' + data,
        method: 'get',
        data
    })
}


// 终端客户的删除
export function deleteEndCustomer(id) {
    return request({
        url: '/api/services/app/EndCustomer/Delete',
        method: 'delete',
        params: { id }
    })
}
// 终端客户的批量删除
export function BatchDeleteEndCustomer(data) {
    return request({
        url: '/api/services/app/EndCustomer/BatchDelete',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data
    })
}
