// 从api中获取登录，退出，获取身份三个方法
import { login, logout, getInfo } from '@/api/user'
// 从auth中获取设置，获取，删除token的方法
import { getToken, setToken, removeToken } from '@/utils/auth'
// 获取路由对象
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userId: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) { // userinfo是传过来的参数
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      // 调用api的login方法
      login({ username: username.trim(), password: password }).then(response => {
        const { data, code } = response
        if (code == 200) {
          commit('SET_TOKEN', data)
          const d = setToken(data)
          const hasToken = getToken()
          resolve()
        } else {
          reject('500')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => { // 调用getinfo从后端拿数据
        const { data } = response
        console.log(data)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const roles = []
        const { id, roleId, nickname, avatar, introduction } = data // 拿具体数据
        console.log('🚀 ~ file: user.js:70 ~ getInfo ~  data:', data)
        console.log('后端返回的信息')

        if (roleId == 0) { roles.push('admin') }
        if (roleId == 1) { roles.push('editor') }
        if (roleId == 2) { roles.push('user') }
        commit('SET_USERID', id)
        commit('SET_ROLES', roles) // 共享 身份 这一变量
        commit('SET_NAME', nickname)
        console.log('后端返回的nickname' + nickname)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        data['roles'] = roles // 不容易 我靠   permission.js里需要解析data中的roles
        resolve(data) // 就是返回值
      })
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
