import request from '@/utils/request'

// 获取分组
export function getGroup(params) {
  return request({
    url: '/domain/group/',
    method: 'get',
    params
  })
}
