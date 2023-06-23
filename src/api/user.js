import request from '@/utils/request' // 封装axios的文件

export function login(data) {
  return request({ // 等同于axios对象
    url: '/api/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/users/getinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/users/logout',
    method: 'post'
  })
}

export function getUser(nickname) {
  return request({
    url: '/api/users/getUserByNickname',
    method: 'get',
    params: { nickname }
  })
}

export function getAdmin(queryList) {
  return request({
    url: '/api/users/getAdmin',
    method: 'get',
    params: queryList
  })
}
