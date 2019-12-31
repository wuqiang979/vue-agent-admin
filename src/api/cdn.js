import request from '@/utils/request'

// 添加域名转发记录
export function addCdn(data) {
  return request({
    url: '/domain/domain/',
    method: 'post',
    data
  })
}
