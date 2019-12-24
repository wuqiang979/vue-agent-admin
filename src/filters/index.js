/*
 * @Author: your name
 * @Date: 2019-12-03 23:23:43
 * @LastEditTime: 2019-12-03 23:25:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \backgroud\src\filters\index.js
 */

export const dealLevel = (num) => {
  let level = ''
  switch (num * 1) {
    case 1:
      level = '初级会员'
      break
    case 2:
      level = '高级会员'
      break
  }
  return level
}
