<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <!-- 父子组件通讯 -->
          <user-card v-if="likeMapLoadingOver" :user="user" :article-list="articleList" />
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
              <span style="margin:0px 5px;font-size:14px;padding-right:2px"> 这个人还没有发表游记，请耐心等等---</span>
            </div>

          </el-card>
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="TA的游记" name="activity">
                <activity />
              </el-tab-pane>

              <!-- <el-tab-pane label="账号信息" name="account">
                <account :user="user" />
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/article'
import { getUser } from '@/api/user'
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import request from '@/utils/request'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      nickname: '',
      user: {},
      activeTab: 'activity',
      articleList: [],
      likeMap: {},
      likeMapLoadingOver: false,
      entityId: undefined
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction',
      'userId'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // http://localhost:9527/#/profile_for_other/index/就是这么强大
      this.nickname = this.$route.params.name // 根据nickname获取数据库的信息
      // console.log('获取到nickname参数 '+this.nickname);
      this.user = await getUser(this.nickname)
      this.user = this.user.data
      this.entityId = this.user.id
      console.log('被访问用户name:' + this.user.id)
      if (this.user.nickname == this.name) {
        this.$router.push('/profile')
      }

      this.articleList = await getList(this.user.nickname, 'desc')
      this.articleList = this.articleList.data

      const userId = this.userId
      const entityType = 1 // user实体的type
      const entityId = this.entityId // 自己给别人点赞
      const temp = await request({
        url: '/api/like/like',
        method: 'get',
        params: { userId, entityType, entityId }
      })

      this.likeMap = temp.data
      console.log(this.likeMap)
      this.likeMapLoadingOver = true
    }

  }
}
</script>

<style lang="scss" scoped>
.button1{
  color:#ff8a00
}
</style>
