<template>
  <div class="user-activity">
    <el-empty v-if="articleList===undefined ||articleList.length===0 " description="您的游箱空空如也，快来补充吧...." />
    <div v-for="article in articleList" :key="article.id" class="post">
      <!-- 背景图片-->
      <div class="image">
        <span style="width:inherit;position:absolute;text-align:right;padding:20px 40px;color:white">
          <h1 style="display:inline;font-size:40px;font-weight:500">{{ article.region }}/</h1>
          <h2 style="display:inline">{{ article.createtime.substr(5,2) }}月</h2>
        </span>
        <img :src="article.cover" style="width: 100%;height:100%;object-fit: cover;border-radius:10px">
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
import { mapGetters } from 'vuex'
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction'
    ])
  },
  created() {
    this.getUser()
    this.getArtList()
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
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar,
        introduction: this.introduction
      }
      // console.log(this.user)
    },
    async getArtList() {
      this.articleList = await getList(this.user.name, 'desc')
      this.articleList = this.articleList.data
      console.log(this.articleList)
    }
  },
  data() {
    return {
      user: {},
      articleList: []

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
      border-radius: 30%;

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
