import request from '@/utils/request'

// 添加域名转发记录(单条)
export function addCdn(data) {
  return request({
    url: '/domain/domain/',
    method: 'post',
    data
  })
}

// 添加域名转发记录（多条）
export function addCdns(data) {
  return request({
    url: '/domain/multi/',
    method: 'post',
    data
  })
}

// 查询域名转发记录
export function getCdns(params) {
  return request({
    url: '/domain/domain/',
    method: 'get',
    params
  })
}

// 查询域名转发记录详情
export function getCdnDetail(id) {
  return request({
    url: `/domain/domain/${id}/`,
    method: 'get'
  })
}

// 修改域名转发记录整体信息
export function putCdnAllIfo(data) {
  return request({
    url: `/domain/domain/${data.id}/`,
    method: 'put',
    data
  })
}

// 修改域名转发记录部分信息
export function putCdnPartIfo(id, data) {
  return request({
    url: `/domain/domain/${id}/`,
    method: 'patch',
    data
  })
}

// 删除单条域名转发记录
export function delCdn(id) {
  return request({
    url: `/domain/domain/${id}/`,
    method: 'delete'
  })
}
