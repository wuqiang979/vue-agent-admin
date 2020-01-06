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

// 获取用户列表
export function getUserList(params) {
  return request({
    url: `/user/user/`,
    method: 'get',
    params
  })
}
