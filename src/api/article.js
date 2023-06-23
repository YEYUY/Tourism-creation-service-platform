import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

// 修改文章
export function updateArticle(data) {
  return request({
    url: '/api/article/update',
    method: 'post',
    data
  })
}
// 返回用户的草稿
export function fetchDraftsByName(username) {
  return request({
    url: '/api/article/fetchDraftsByName',
    method: 'get',
    params: { username }
  })
}

// 返回用户的已发布文章列表
export function getList(name, sort) {
  console.log('传去后端的nickname', name)
  return request({
    url: '/api/article/listByName',
    method: 'get',
    params: { name, sort }
  })
}

