import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

// 修改账号基本信息
export function putUserInfo(data) {
  return request({
    url: `/user/me`,
    method: 'patch',
    data
  })
}

// 修改账号密码
export function modifyPsd(data) {
  return request({
    url: `/user/password`,
    method: 'post',
    data
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: `/user/user/`,
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: `/user/user/`,
    method: 'get',
    params
  })
}

// 获取用户详情
export function getUserData(id) {
  return request({
    url: `/user/user/${id}/`,
    method: 'get'
  })
}

// 编辑用户信息
export function putUserData(id, data) {
  return request({
    url: `/user/user/${id}/`,
    method: 'PATCH',
    data
  })
}

// 删除用户
export function delUser(id) {
  return request({
    url: `/user/user/${id}/`,
    method: 'DELETE'
  })
}
