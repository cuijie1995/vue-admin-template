import request from '@/utils/request'

export function getAllRole(data) {
    return request({
        url: '/api/services/app/Role/GetAll',
        method: 'get',
        params:data
    })
}

export function createRole(data) {
    return request({
        url: '/api/services/app/Role/Create',
        method: 'post',
        data
    })
}



export function getRole(data) {
    return request({
        url: '/api/services/app/Role/Get?id=' + data,
        method: 'get',
        data
    })
}

export function updateRole(data) {
    return request({
        url: '/api/services/app/Role/Update',
        method: 'put',
        data
    })
}
export function deleteRole(id) {
    return request({
        url: '/api/services/app/Role/Delete',
        method: 'delete',
        params: {id}
    })
}

export function searchRole(data) {
    return request({
        url: '/api/services/app/Role/GetAll',
        method: 'get',
        params:data
    })
}


export function GetPermissions(data) {
    return request({
        url: '/api/services/app/Role/GetAllPermissions',
        method: 'get',
        data
    })
}


