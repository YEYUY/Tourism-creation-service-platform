<template>
  <el-container direction="vertical">
    <el-header height="800px" style="padding: 0px;">
      <!-- Header content -->
      <div>
        <div class="demo-image">
          <el-image
            v-if="url.length>=1"
            style="width: 100%; height: 700px;"
            :src="article.cover"
            fit="fit"
          />
        </div>
        <div class="title-info" style="margin-top: -100px;margin-left: 500px;">
          <el-row class="demo-avatar demo-basic">
            <div class="block"><el-avatar :size="150" :src="avatar" fit="cover" /></div>
          </el-row>
          <el-row calss="article-title" style="margin-top: -150px;margin-left: 150px;font-size: 40px;font-weight: bold;color: white;">
            {{ article.title }}
          </el-row>
          <el-row :gutter="10" style="margin-top: 70px;">
            <el-col :span="4" :offset="3" style="font-size: 18px;color: orange;">
              <i class="el-icon-user-solid" />
              {{ article.author }}
            </el-col>
            <el-col :span="5" :offset="0" style="color: gray;">
              <i class="el-icon-time" />
              创建时间：{{ article.createtime }}
            </el-col>
            <el-col :span="3" :offset="0" style="color: gray;">
              <i class="el-icon-view" />
              浏览量：{{ article.readings }}
            </el-col>
          </el-row>
        </div>
      </div>
      <el-divider />
    </el-header>
    <el-main>
      <el-row :gutter="0">
        <el-col :span="16" :offset="0">
          <!-- Main content -->
          <el-card shadow="" class="box-card" style="margin-left: 200px;">
            <!-- card body -->
            <el-row :gutter="20" style="font-size: 18px;color: gray;">
              <el-col :span="8" :offset="0"><i class="el-icon-time" style="padding-right: 5px;color: orange;" />出发时间/   <span style="color:#ff9e00;margin-left:5px">  {{ article.starttime.substr(0,10) }}</span></el-col>
              <el-col :span="6" :offset="1"><i class="el-icon-moon" style="padding-right: 5px;color: orange;" />出行天数/   <span style="color:#ff9e00;margin-left:5px">  {{ article.days }}天</span></el-col>
              <el-col :span="6" :offset="2"><i class="el-icon-user" style="padding-right: 5px;color: orange;" />人物/   <span style="color:#ff9e00;margin-left:5px">  {{ article.indivisuals }}</span></el-col>
              <el-col v-if="article.aveconsume" :span="8" :offset="0" style="margin-top: 25px;"><i class="el-icon-coin" style="padding-right: 5px;color: orange;" />人均费用/   <span style="color:#ff9e00;margin-left:5px">  {{ article.aveconsume }}RMB</span></el-col>
            </el-row>
          </el-card>
          <p style="margin-left: 200px;color: #444;width: 900px;margin-top: 50px;font-size: 16px;line-height: 28px;text-align: justify;word-break:break-word" v-html="article.content" />

        </el-col>
        <el-col :span="8" :offset="0">
          <div>
            <div style="color: #666666;font-size: 20px;">相关目的地:
              <router-link v-for="(des,index) in relativeDes" :key="index" :to="{name:'NameCard',params:{name:des} }">
                <span style="margin-left:6px;color:orange;font-size:20px;font-weight:bold">
                  {{ des }}</span>
              </router-link>
            </div>

            <div>
              <el-image
                v-if="des.cover.length >1"
                style="width: 300px; height: 200px;margin-top: 10px;"
                :src="des.cover"
                fit="cover"
              />
              <el-row style="font-size: 45px;color: white;margin-top: -70px;margin-left: 8px;font-weight:bold;letter-spacing:10px">{{ article.region }}</el-row>
            </div>
            <div style="font-size: 20px;color: #666;margin-top: 40px;">有 <span style="color:#666666;font-size:25px;font-weight:700">{{ totalCount }}</span> 篇文章</div>
          </div>
          <br>
          <br>
          <div v-if="lunboList.length>=1 " style="width: 300px;height: 200px;">
            <div style="color: #666666;font-size: 20px;margin-bottom:10px">相关文章：</div>
            <div class="block">
              <el-carousel trigger="click" height="200px">
                <el-carousel-item v-for="(item,index) in lunboList" :key="index" style="postion:relative;">
                  <router-link :to=" {name:'Display',params:{id:item.id} }">
                    <el-image style="width: 300px; height: 200px;" :src="item.cover" fit="cover" />
                    <div style="top:5%;left:5%;position:absolute;color:white;font-size:18px;height:100%;width:300px;">
                      <i v-if="item.readings" class="el-icon-view">  {{ item.readings }}</i>
                      <span style="top:64%;left:-2%;;font-size:24px;color:white;font-weight:bold;position:absolute">{{ item.title }}</span>
                    </div>
                  </router-link>
                </el-carousel-item>
              </el-carousel>
            </div>

          </div>

        </el-col>
      </el-row>
    </el-main>
    <br>
    <br>
    <el-footer height="500px" style="background-color: white;">
      <!-- Footer content -->
    </el-footer>
  </el-container>

</template>

<script>
import { get } from '@/utils/request'
import request from '@/utils/request'
import { getArticle } from '@/api/article'
import { Avatar } from 'element-ui'
export default {
  data() {
    return {
      url: 'https://note.mafengwo.net/img/76/71/c4fd5f71e5325fe4cc56f088a05b923d.jpeg?imageMogr2%2Fstrip',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      id: 0,
      article: {},
      listQuery: { id: 0, nickname: '' },
      avatar: '',
      relativeDes: ['新疆', '婺源'],
      totalCount: 0,
      des: {
        cover: 'https://note.mafengwo.net/img/76/71/c4fd5f71e5325fe4cc56f088a05b923d.jpeg?imageMogr2%2Fstrip'
      },
      lunboList: [

      ]
    }
  },
  created() {
    this.getArticle()
  },
  methods: {

    async getArticle() {
      this.listQuery.id = this.$route.params.id
      let article
      await get('/api/article/getArticleById', this.listQuery).then((res) => {
        article = res.data
        this.listQuery.nickname = article.author
        this.article = res.data
      })
      await get('api/users/getUserByNickname', this.listQuery).then((res) => {
        const user = res.data
        this.avatar = user.avatar
      })
      var name = article.region
      await get('api/destination/getDesByName', { name }).then(res => {
        if (res.data) {
          this.relativeDes = res.data.relativedes.split(',')
          this.des = res.data
        }
      })

      await get('api/article/getCountByName', { name }).then(res => {
        this.totalCount = res.data
      })

      var tags = article.tags
      await get('api/article/getSimilarByTags', { tags: tags, id: this.article.id }).then(res => {
        console.log('🚀 ~ file: index.vue:161 ~ awaitget ~ res:', res)
            	if (res.data) {
                	this.lunboList = res.data
                	console.log('🚀 ~ file: index.vue:162 ~ awaitget ~ this.lunboList = res.data;:', this.lunboList)
            	}
      })
    }
  }
}
</script>

<style>
  .box-card {
    width: 900px;

    border: #d7d7d7 2px dashed;
  }

</style>
