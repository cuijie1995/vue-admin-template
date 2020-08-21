import request from '@/utils/request'

export function getAllUser(data) {
    return request({
        url: '/api/services/app/User/GetAll',
        method: 'get',
        params:data
    })
}

export function createUser(data) {
    return request({
        url: '/api/services/app/User/Create',
        method: 'post',
        data
    })
}

export function getUpdateUser(data) {
    return request({
        url: '/api/services/app/User/Get?id=' + data,
        method: 'get',
        data
    })
}


export function updateUser(data) {
    return request({
        url: '/api/services/app/User/Update',
        method: 'put',
        data
    })
}
export function deleteUser(id) {
    return request({
        url: '/api/services/app/User/Delete',
        method: 'delete',
        params: {id}
    })
}

export function searchUser(data) {
    return request({
        url: '/api/services/app/User/GetAll',
        method: 'get',
        params:data
    })
}

// 获取角色
export function GetRoles(data) {
    return request({
        url: '/api/services/app/User/GetRoles',
        method: 'get',
        data
    })
}


