<template>
  <div class="user-activity">
    <el-empty v-if="articleList===undefined ||articleList.length===0 " description="该旅行家正在旅行中...." />
    <div v-for="article in articleList" :key="article.id" class="post">
      <!-- 背景图片-->
      <div class="image">
        <img :src="article.cover" style="width: 100%;height:100%;object-fit: cover;">
      </div>
      <!-- 主体 -->
      <div class="post-body">
        <!-- 标题 -->
        <div class="post-title">
          <el-button class="button1" type="text" @click="toDisplay(article.id)">{{ article.title }}</el-button>
        </div>
        <!-- 小部件 -->
        <div class="widget">
          <i class="el-icon-view" />
          <span class="widget-span">{{ article.readings }}</span>
          <span class="widget-span">{{ article.createtime }}</span>
        </div>
        <!-- 正文截取100字 -->
        <p v-html="filterContent(article.content)" />
      </div>
    </div>

  </div>
</template>

<script>
import { getList } from '@/api/article'
import { getUser } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      user: {},
      articleList: []

    }
  },
  computed: {

  },
  created() {
    this.getList()
  },
  methods: {
    toDisplay(idd) {
      this.$router.push({ name: 'Display', params: { id: idd }})
    },
    filterContent(value) {
      var reg = /<[^<>]+>/g
      value = value.replace(reg, '') // 把v-html的格式标签替换掉
      if (value.length > 120) {
        return value.slice(0, 120) + '...'
      } else {
        return value
      }
    },
    async getList() {
      // http://localhost:9527/#/profile_for_other/index/就是这么强大
      this.name = this.$route.params.name // 根据nickname获取数据库的信息
      // console.log('获取到nickname参数 '+this.name);
      this.user = await getUser(this.name)
      this.user = this.user.data
      // console.log('获取到user的nickname参数 '+this.user.nickname);
      // console.log(this.user)
      this.articleList = await getList(this.user.nickname, 'desc')
      this.articleList = this.articleList.data
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .post-body{
      padding: 20px 20px 0;
    }
    .post-title{
      .button1{
        font-size: 18px;
        font-weight: bold;
        color:#6585ac
      }
    }

    .image {
      width: 100%;
      height: 300px;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
.widget-span{
  margin-left:5px;
  margin-right:10px;
}
</style>
