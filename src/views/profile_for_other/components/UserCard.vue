<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix" style="font-size:16px;font-weight:bold;">
      <div style="float:left;height:100%">
        <span style="text-align:center;vertical-align:middle">个人名片</span>
      </div>

      <!-- 点赞功能 -->
      <div v-if="likeMap.likeStatus==1" style="float:right;color:#409eff">
        <i class="el-icon-thumb" style="padding-left:20px">
          <el-button type="text" style="font-size:14px;padding:0px 5px" @click="like">{{ this.likeMap.likeStatus==0? "点赞":"已点赞" }}</el-button>
        </i>
        <span style="font-size:14px;">({{ this.likeMap.likeCount }})</span>
      </div>

      <!-- 点赞功能 -->
      <div v-if="likeMap.likeStatus==0" style="float:right">
        <i class="el-icon-thumb" style="padding-left:20px">
          <el-button type="text" style="font-size:14px;color:black;padding:0px 5px" @click="like">{{ this.likeMap.likeStatus==0? "点赞":"已点赞" }}</el-button>
        </i>
        <span style="font-size:14px;color:black">({{ this.likeMap.likeCount }})</span>
      </div>

    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello!</div>

        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <!-- <div class="user-role text-center text-muted role-c">{{ user.role == 0? 'admin': user.role==1? 'editor':'user' | uppercaseFirst }}</div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="user" /><span>个人介绍</span></div>
        <div class="user-bio-section-body">
          <div v-if="user.introduction" class="text-muted">
            {{ user.introduction }}
          </div>
          <div v-if="!user.introduction" class="text-muted">
            这个人很神秘，没有留下自我介绍...
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="form" /><span>文章列表</span></div>
        <div class="user-bio-section-body2">
          <div v-for="(article,i) in articleList" :key="article.id" class="for-article">

            {{ i+1 }}/
            <el-button class="button1" type="text" @click="toProfile(article.title)">{{ article.title.length>15? article.title.substr(0,15)+'...':article.title }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import request from '@/utils/request' // 封装axios的文件

export default {
  components: { PanThumb },
  // 父子组件通讯
  props: {
    articleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    user: {
      type: Object,
      default: () => {
        return {

        }
      }
    }

  },
  data() {
    return {
      likeMap: {
        likeCount: 0,
        likeStatus: 1
      }

    }
  },
  created() {
    this.getLikeMap()
  },
  computed: {
    ...mapGetters([
      'userId' // 从vuex中解析变量，当前登录用户的id
    ])
  },
  methods: {

    async like() {
      const userId = this.userId // 登录用户的id
      const entityId = this.user.id // 被访问的用户的id
      const entityType = 1
      this.likeMap = await request({ url: '/api/like/like', method: 'post', params: { userId, entityType, entityId }})
      this.likeMap = this.likeMap.data
      if (this.likeMap.likeStatus == 1) {
        this.$message({
          showClose: true,
          message: '点赞成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '取消点赞成功',
          type: 'success'
        })
      }
    },
    // 获取该用户的点赞信息
    async getLikeMap() {
      const userId = this.userId
      const entityType = 1 // user实体的type
      const entityId = this.user.id
      const temp = await request({
        url: '/api/like/like',
        method: 'get',
        params: { userId, entityType, entityId }
      })

      this.likeMap = temp.data
      console.log('map')
      console.log(this.likeMap)
    }

  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #606266;
}
.role-c{
  background-color: #42b983;
  border-radius: 5px;
  color: white;
  width: 50px;

}
.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    margin-top:10px;
    line-height: 30px;
    height:30px;
    font-weight: 400;
    font-size: 14px;

  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .user-bio-section-body2{
      font-size: 16px;
      font-weight: bold;
      color:#697c2d
    }
  }

}
.button1{
  font-weight: bold;
  font-size: 16px;
  color:#697c2d
}

</style>
