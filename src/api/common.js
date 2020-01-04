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

// 修改分组部分信息
export function patchGroupInfo(id, data) {
  return request({
    url: `/domain/group/${id}/`,
    method: 'patch',
    data
  })
}

// 修改分组全部信息
export function putGroupInfo(data) {
  return request({
    url: `/domain/group/${data.id}/`,
    method: 'put',
    data
  })
}

// 删除分组记录
export function delGroup(id) {
  return request({
    url: `/domain/group/${id}/`,
    method: 'DELETE'
  })
}
