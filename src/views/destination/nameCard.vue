<template>
  <el-container>
    <el-header height="300px" :style="{'background-color':'#d7d7d7','padding': '0px','background-image':'url('+desInfo.cover+')','background-repeat':'no-repeat','background-size':'cover','background-position':'center 20%'}">
      <div style="padding-left: 150px;padding-right: 150px;">
        <div style="margin-top: 20px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/destination/index' }">
              <span style="color:white">
                目的地
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in desInfo.prefix" :key="index">
              <router-link :to="{name:'NameCard',params:{name:item} }">
                <span style="color:white">
                  {{ item }}
                </span>
              </router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <span style="color:white">
                {{ desInfo.name }}
              </span></el-breadcrumb-item>
            <el-breadcrumb-item>
              <span style="color: #e26b25;font-weight: bold;;font-size:20px">
                {{ desInfo.name }}旅游攻略
              </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="padding-top: 20px;">
          <span style="font-size: 40px;color:white">{{ desInfo.name }}</span>
          <span style="font-size: 10px; padding-left: 15px;color:white">(<span style="font-size:16px;font-weight:bold;">  {{ artCount }}  </span>篇游记，收录景点<span style="font-size:16px;font-weight:bold;">  {{ desInfo.sitenum }}  </span>处)</span>
          <div style="font-size: 20px;color: #ffdf55;">{{ desInfo.engname }}</div>
        </div>
        <div style="height: 80px;padding-top: 10px;color:white;white-space:pre-wrap">{{ desInfo.introduction }}</div>
        <div style="padding-top: 30px;">
          <el-tag v-for="(item,index) in desInfo.characteristics" :key="item" :type="typeMap[index%4]" style="margin-right: 10px;font-size:16px">{{ item }}</el-tag>
        </div>
      </div>
    </el-header>

    <el-main style="padding: 0px;">
      <div style="padding-left: 130px;padding-right: 130px;border-bottom:2px solid #909399;margin:0px 20px">
        <div style="padding-top: 30px;font-size: 30px;"><span style="text-shadow:2px 1px 8px black;color:#fff8e6;font-size:35px">{{ desInfo.name }}</span> 热门景点</div>
        <div style="padding-bottom: 30px;">
          <el-row>
            <el-col v-for="(item,index) in sites" :key="index" :span="12" :offset="0" style="padding-top: 30px;">
              <el-card :body-style="{ padding: '0px' }" style="width: 90%;height:570px" class="card">
                <div style="padding: 10px;font-size: 20px;font-weight:bold;margin-left:1%">
                  <span style="margin-right:100px;">
                    <span style="letter-spacing:5px">
                      {{ item.name }}
                    </span>
                    <span v-if="item.stars" style="letter-spacing:0px;font-weight:600;font-size:16px">
                      ({{ item.stars }}A级景区)
                    </span>
                  </span>
                  <el-tag v-for="(known,index1) in item.knowns" :key="index1" :type="typeMap[index%4]" style="float:right;margin-right:10px;font-size:15px">{{ known }}</el-tag>
                </div>
                <el-image style="width: 100%; height: 350px;" :src="item.cover" fit="cover" />
                <div style="padding: 14px;padding-bottom:10px;height:75px">
                  <div style=""><span style="font-weight:bold;font-size:16px">介绍:</span>
                    <span style="text-shadow:1px 0px 0px #959f9e;font-size:14px">  {{ item.introduction.substr(0,100) }}...</span>
                  </div>
                </div>
                <div style="padding-left: 14px;padding-bottom:5px">
                  <div style="">
                    <span style="font-weight:bold;font-size:16px">热评</span>
                    <span style="font-weight:400;font-size:15px">(有{{ item.commentsnum }}条评论)</span>
                  </div>
                  <span style="text-shadow:1px 0px 0px #959f9e;font-size:14px">{{ item.hotcomment.substr(0,120) }}...</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <div style="">
        <div style="padding-left: 150px;padding-right: 150px;">
          <div style="padding-top: 30px;font-size: 30px;"><span style="text-shadow:2px 1px 8px black;color:#fff8e6;font-size:35px">{{ desInfo.name }}</span> 相关游记</div>
          <div>
            <div v-for="(article,index) in articles" :key="index" class="article" style="position:relative;">
              <router-link :to="{name:'Display',params:{id:article.id} }">
                <el-row :gutter="20" style="height: 150px;">
                  <el-col :span="5" :offset="0">
                    <el-image
                      style="width: 100%; height: 150px;"
                      :src="article.cover"
                      fit="cover"
                    />
                  </el-col>
                  <el-col :span="17" :offset="0" style="height: 100%;">
                    <div style="font-size: x-large;">{{ article.title }}</div>
                    <p class="content-p" style="padding-top:5px;line-height:18px;margin:0px 0px;font-weight:14px;color:#666666;width:100%;white-space:normal;height:90px" v-html="filterContent(article.content)" />
                    <div style="">
                      <el-row>
                        <el-col :span="24" :offset="0">
                          <i class="el-icon-location" style="font-size:16px" />
                          <span class="widget-span" style="margin-right:5px">{{ article.region }},by </span>
                          <!-- 分自己的主页和他人的主页 -->
                          <router-link :to="{name: 'Profile', params: {name: article.author } }" class="widget-span" style="margin-right:30px;color:#ff9d00">{{ article.author }}</router-link>
                          <i class="el-icon-view" style="font-size:16px" />
                          <span class="widget-span" style="margin-right:50px">{{ article.readings }}</span>
                          <i class="el-icon-date" style="font-size:16px" />
                          <span class="widget-span">{{ article.createtime.substr(0,9) }}</span>
                        </el-col>

                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </router-link>
            </div>
          </div>
          <br>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { get } from '@/utils/request'
import request from '@/utils/request'
import { getArticle } from '@/api/article'
export default {
  data() {
    return {
      desInfo: {},
      artCount: 0,
      typeMap: ['success', 'info', 'warning', 'primary'],
      sites: {},
      articles: {}
    }
  },
  created() {
    this.getDesInfo()
  },
  mounted() {
    var card = document.querySelector('.card')

    card.addEventListener('mousemove', function(event) {
      var rect = box.getBoundingClientRect()
      var x = event.clientX - rect.left
      var y = event.clientY - rect.top
      var centerX = rect.width / 2
      var centerY = rect.height / 2
      var deltaX = (centerX - x) / centerX
      var deltaY = (centerY - y) / centerY
      var scale = 'scale(' + (1 + deltaX * 0.2) + ',' + (1 + deltaY * 0.2) + ')'
      box.style.transform = scale
    })

    card.addEventListener('mouseleave', function(event) {
      box.style.transform = 'scale(1)'
    })
  },
  methods: {
    filterContent(value) {
      var reg = /<[^<>]+>/g
      value = value.replace(reg, '') // 把v-html的格式标签替换掉
      if (value.length > 300) {
        return value.slice(0, 300) + '...'
      } else {
        return value
      }
    },
    getDesInfo() {
      var name = this.$route.params.name
      console.log('🚀 ~ file: nameCard.vue:169 ~ getDesInfo ~ name:', name)
      if (!name) { name = '婺源' }
      get('/api/destination/getDesByName', { name: name }).then((res) => {
        this.desInfo = res.data
        this.desInfo.prefix = this.desInfo.prefix.split('-')
        this.desInfo.characteristics = this.desInfo.characteristics.split(',')
      })
      get('api/article/getCountByName', { name: name }).then(res => {
        this.artCount = res.data
      })
      get('api/site/getSitesByDesName', { name: name }).then(res => {
        if (res.data.length > 4) { this.sites = res.data.slice(0, 4) } else {
          this.sites = res.data
          console.log('🚀 ~ file: nameCard.vue:186 ~ get ~ this.sites:', this.sites)
        }
        for (let i = 0; i < this.sites.length; i++) {
          const knownsArr = this.sites[i].knowns.split(',') // 使用split()方法将knowns属性按照逗号切分成数组
          this.sites[i].knowns = knownsArr // 将切分后的数组赋值给knowns属性
        }
      }),
      get('api/article/getArticlesByRegion', { region: name, pageNum: 1, pageSize: 3 }).then(res => {
        this.articles = res.data.data
        console.log('🚀 ~ file: nameCard.vue:158 ~ get ~  this.articles:', this.articles)
      })
    }
    // method
  }
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .image {
    width: 100%;
    display: fill;
  }
  .article{
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .card{
    transition: transform 0.3s ease-out;
  }

  .card:hover {
  transform: scale(1.05);
}
</style>
