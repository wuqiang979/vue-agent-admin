import request from '@/utils/request'

// 添加分组记录(单条)
export function addGroup(data) {
  return request({
    url: '/domain/group/',
    method: 'post',
    data
  })
}

// 查询分组列表
export function getGroup(params) {
  return request({
    url: '/domain/group/',
    method: 'get',
    params
  })
}

// 查询分组详情
export function getGroupDetail(id) {
  return request({
    url: `/domain/group/${id}/`,
    method: 'get'
  })
}
