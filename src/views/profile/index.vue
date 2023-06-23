<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card v-if="userLoadOver" :user="user" :article-list="articleList" :like-map="likeMap" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card style="margin-bottom:10px">   <!-- 最新攻略的展示 -->

            <div v-if="articleList !== undefined && articleList.length > 0">
              <el-button class="button1" type="text" @click="toProfile()">{{ user.nickname }}</el-button>
              <span style="margin:0px 5px;font-size:14px;padding-right:2px"> 发表了新攻略</span>
              <el-button class="button1" type="text" @click="toDisplay()">{{ articleList[0].title }}</el-button>
              <span style="margin:0px 10px;font-size:10px;color:#9999b3">{{ articleList[0].createtime }}</span>
            </div>

            <div v-if="articleList.length===0">
              <span style="margin:0px 5px;font-size:14px;padding-right:2px"> 你还没有发表游记，快向大家分享你的旅行日记吧---</span>
            </div>
          </el-card>
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="TA的游记" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="账号信息" name="account">
                <account v-if="userLoadOver" :user="user" />
              </el-tab-pane>
              <el-tab-pane label="留言板" name="comments">
                <comments />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/article'
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import request from '@/utils/request'
import { get } from '@/utils/request'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      nickname: '',
      user: {
        name: '',
        avatar: '',
        role: '',
        introduction: '',
        userId: 0,
        password: '',
        nickname: '',
        roleId: 1,
        gender: 0
      },
      activeTab: 'activity',
      articleList: [],
      likeMap: {},
      userLoadOver: false

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction',
      'userId' // 从vuex中解析变量
    ])
  },
  created() {
    this.getUser()
    this.getArtList()

    this.getLikeMap()
  },
  methods: {
    async getUser() {
      await get('/api/users/getUserById', { id: this.userId }).then(res => {
        this.user = res.data
        console.log('个人首页拿到的 this.user:', this.user)

        this.userLoadOver = true
        this.user.role = this.roles.join(',')
      })
      this.articleList = await getList(this.user.nickname, 'desc')
      this.articleList = this.articleList.data
    },
    async getArtList() {
    },
    // 获取点赞信息
    async getLikeMap() {
      const userId = this.user.userId
      const entityType = 1 // user实体的type
      const entityId = this.user.userId // 自己给自己点赞
      const temp = await request({
        url: '/api/like/like',
        method: 'get',
        params: { userId, entityType, entityId }
      })

      this.likeMap = temp.data
    }
  }
}
</script>

<style lang="scss" scoped>
.button1{
  color:#ff8a00
}
</style>
