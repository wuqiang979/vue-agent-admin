import Cookies from 'js-cookie'

const TokenKey = 'auth_token'
const UserData = 'user_data'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 用户信息
export function getUserData() {
  return Cookies.get(UserData)
}

export function setUserData(userData) {
  return Cookies.set(UserData, userData)
}

export function removeUserData() {
  return Cookies.remove(UserData)
}
