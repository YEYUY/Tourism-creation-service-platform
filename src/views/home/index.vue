<template>
  <div class="block">
    <!-- 首页轮播图 -->
    <el-carousel trigger="click" height="700px" style="position:relative" :autoplay="true" :interval="5000">
      <el-carousel-item v-for="(item,index) in lunboComponent" :key="index">
        <div class="date" style="position:absolute;margin-left:13%;margin-top:40px;font-size:25px;color:white">
          <span class="day" style="font-size:38px;padding:0px">
            {{ item.createtime.substr(8,2) }}
          </span>
          <span style="margin-left:-8px;font-weight:500">
            /{{ monthArr[+item.createtime.substr(5,2)] }}.{{ item.createtime.substr(0,4) }}
          </span>

        </div>
        <span style="font-size:30px;position:absolute;font-weight:500;margin-left:13%;margin-top:85px;color:white">{{ item.title }}</span>

        <div class="input-search">
          <el-radio-group v-model="radio" style="margin-top:10px;margin-bottom:10px;margin-left:20px;color:white">
            <!-- <el-radio :label="1">全部</el-radio> -->
            <el-radio :label="2">目的地</el-radio>
            <el-radio :label="3">攻略</el-radio>
          </el-radio-group>

          <el-input v-if="radio==1" v-model="inputDes" placeholder="搜目的地/攻略" style="width: 250px;margin-left:15px;margin-right:15px;font-size:15px;" class="filter-item" />
          <el-input v-if="radio==2" v-model="inputDes" placeholder="搜目的地" style="width: 250px;margin-left:15px;margin-right:15px;font-size:15px;" class="filter-item" />
          <el-input v-if="radio==3" v-model="inputDes" placeholder="搜攻略" style="width: 250px;margin-left:15px;margin-right:15px;font-size:15px;" class="filter-item" />
          <el-button class="des_choices" type="warning" icon="el-icon-search" style="" @click="handleQuery">
            查询
          </el-button>
        </div>

        <div class="lunbo-bottom" style="position:absolute;bottom:30px;left:40%;color:white;font-size:14px;">
          <span>图片来自于
            <a href="javascript:;" style="color:#e06639" @click="linkRegion(item.region)">{{ item.region }}</a>
            ,本篇由
            <a id="author" href="javascript:;" style="color:#e06639" @click="linkProfile(item.author)">{{ item.author }}</a>
            荣誉出品！
          </span>
        </div>
        <img :src="item.cover" style="height:100%;width:100%;">

      </el-carousel-item>
    </el-carousel>
    <!-- 卡片部分 -->
    <!-- type="flex" justify="center" -->
    <el-row :gutter="24" type="flex" justify="center">
      <el-col :span="3">
        <router-link :to="{name: 'Destination', params: {} }">
          <div class="card">
            <h4 style="position:absolute;left:25px;width:50px;margin:0px">自由行</h4>
            <span style="position:absolute;left:25px;color:#9d9d9d;font-size:10px; top:30px">旅游就要更自在</span>
            <img style="position:absolute;right:40px; top:10px ;height:30px;width:30px;" src="https://i.328888.xyz/2023/04/24/iSKeip.png">
          </div>
        </router-link>
      </el-col>

      <el-col :span="3">
        <div class="card" onclick="window.open('http://localhost:9527/ticket/ticket.html');">

          <h4 style="position:absolute;left:25px;width:50px;margin:0px">订机票</h4>
          <span style="position:absolute;left:25px;color:#9d9d9d;font-size:10px; top:30px">优惠一折起！</span>
          <img style="position:absolute;right:40px; top:10px ;height:30px;width:30px;" src="https://i.328888.xyz/2023/04/24/iSLTGp.jpeg">
        </div>
      </el-col>

      <el-col :span="3">
        <div class="card" onclick="window.open('http://localhost:9527/hotel/hotel.html');">
          <h4 style="position:absolute;left:25px;width:50px;margin:0px">订酒店</h4>
          <span style="position:absolute;left:25px;color:#9d9d9d;font-size:10px; top:30px">一键全网比价</span>
          <img style="position:absolute;right:40px; top:10px ;height:30px;width:30px;" src="https://i.328888.xyz/2023/04/24/iSLqPy.jpeg">
        </div>
      </el-col>
    </el-row>

    <!-- 左栏目  右栏目 -->
    <el-row :gutter="30">
      <el-col :span="6" :offset="3">
        <div>
          <el-button type="text" size="default" @click="notifySecurityInfo">
            <img style="margin-top:20px;" src="https://i.328888.xyz/2023/04/24/iSMOdN.jpeg">
          </el-button>
        </div>

        <div class="userWrapper">
          <div style="height:60px;border-bottom:#e8e8ed solid 2px;position:relative">
            <span style="font-size:30px;left:10%;top:20%;position:absolute">
              <span style="color:#ff9d00">"游侠"</span> 推荐</span>
          </div>

          <el-row v-for="(item,index) in userList" :key="index" style="height: 70px;margin:20px 10px">
            <router-link :to="{name: 'Profile_o', params:{name:item.nickname} }">
              <el-col :span="5" :offset="1">
                <div style="height:60px;width:60px;border-radius:50%;overflow:hidden">
                  <img :src="item.avatar" style="height:100%;width:100%;object-fit:fit" alt="">
                </div>
              </el-col>

              <el-col :span="18">
                <el-row>
                  <el-col :span="24" style="margin:0px 0px">
                    <span style="font-size:20px">{{ item.nickname }}</span>
                    <i v-if="!item.gender | item.gender == 0 " class="el-icon-s-custom" style="margin:0px 10px;font-size:20px;color:#4d6f7e" />
                    <i v-if="item.gender == 1" class="el-icon-s-custom" style="margin:0px 10px;font-size:20px;color:#bc6942" />
                  </el-col>
                </el-row>
                <el-row>
                  <span style="color:#3494ff;font-size:15px;">自{{ item.createTime.substr(0,10) }}加入逍遥游</span>
                </el-row>
                <el-row>
                  <el-col :span="24" style="color:#999aaa;margin-top:5px">
                    <span v-if="item.introduction" style="font-size:15px">{{ item.introduction.length>=20 ?item.introduction.substr(0,20) : item.introduction }}...</span>
                    <span v-if="!item.introduction" style="font-size:15px">这个人很神秘，什么都没留下...</span>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="6">
                <el-row />
              </el-col>
            </router-link>
          </el-row>
        </div>
        <div style="height:100px;" />
      </el-col>

      <el-col :span="12">
        <div style="padding-bottom:10px;border-bottom:#e4e4e4 2px solid;margin-bottom:20px">
          <h2 style="margin:0px;margin-left:30px;margin-top:45px;color:#ff9d00;font-weight:400px;display:inline-block">热门游记</h2>
          <router-link :to="{name: 'CreateArticle', params: {} }" class="widget-span" style="margin-right:10px;color:#ff9d00">
            <el-button type="info" style="background-color:#ff9d00;border-color:#ff9d00;width:150px;margin-left:400px;">
              <i class="el-icon-video-camera" style="font-size:25px" />
              <span style="font-weight:600px;font-size:18px">写游记</span>
            </el-button>
          </router-link>
        </div>

        <!-- 分页循环渲染游记 -->
        <div v-for="(item,index) in hotArticleList" :key="index" style="height:180px;width:700px;">
          <router-link :to="{name:&quot;Display&quot;,params:{ id:item.id} }">
            <el-button class="article" style="height:100%;width:100%;text-align:left" type="info">
              <div class="article-content" style="">
                <div class="article-img" style="display:inline-block;height:170px; margin-right:20px">
                  <img style="width:220px;height:150px;margin:auto 0px;object-fit:cover" :src="item.cover">
                </div>

                <div style="display:inline-block;color:black;vertical-align:top" class="article-text">
                  <h1 class="article-title" style="margin:0px;font-size:18px;font-weight:500;margin-bottom:10px">{{ item.title.length>22? item.title.substr(0,22)+"...": item.title }}</h1>
                  <div style="height:105px;overflow:hidden">
                    <p class="content-p" style="line-height:18px;margin:0px 0px;font-weight:14px;color:#666666;width:400px;white-space:normal;word-wrap:break-word" v-html="filterContent(item.content)" />
                  </div>
                  <div class="widget" style="color:#666666;">
                    <i class="el-icon-location" style="font-size:16px" />
                    <span class="widget-span" style="margin-right:5px">{{ item.region }},by </span>

                    <!-- 分自己的主页和他人的主页 -->
                    <router-link v-if="item.author!=name" :to="{name: 'Profile_o', params: {name: item.author } }" class="widget-span" style="margin-right:10px;color:#ff9d00">{{ item.author }}</router-link>
                    <router-link v-else :to="{name: 'Profile', params: {name: item.author } }" class="widget-span" style="margin-right:10px;color:#ff9d00">{{ item.author }}</router-link>

                    <i class="el-icon-view" style="font-size:16px" />
                    <span class="widget-span" style="margin-right:10px">{{ item.readings }}</span>
                    <i class="el-icon-date" style="font-size:16px" />
                    <span class="widget-span">{{ item.createtime.substr(0,9) }}</span>
                  </div>
                </div>
              </div>
            </el-button>
          </router-link>
        </div>

        <div class="block" style="float:right;margin-right:20px;margin-top:20px">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="page_sizes"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalArticle"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div style="height:50px" />
      </el-col>
    </el-row>
  </div>
</template>

<script scoped>
import { get } from '../../utils/request'
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      // 轮播的数据
      lunboComponent: [],
      // {time: "2022-04-21",title:"时隔1439天！那些关于泰国的变与不变——没怎么逛景点的非典型性泰国游记",region:"洛阳",author:"就是这么强大",cover:"https://p1-q.mafengwo.net/s19/M00/AA/40/CoNKtmRGbaQiPTK8AC21c2sPcj8.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"},
      // {time: "2022-04-14",title:"广州 ☆ 无尽春光织繁华，花城无处不飞花",region:"洛阳",author:"就是这么强大",cover:"https://p1-q.mafengwo.net/s19/M00/C5/16/CoNGWWRCceFdJsd1ACmjdBqxhhA.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"},
      // {time: "2022-04-14",title:"时隔1439天！|那些关于泰国的变与不变——没怎么逛景点的非典型性泰国游记",region:"洛阳",author:"就是这么强大",cover:"https://p1-q.mafengwo.net/s19/M00/B8/C5/CoNBSGRA-e8KwBJPACVzIbW_BFg.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg"},

      monthArr: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec', 'Nov'],
      radio: 2,
      totalArticle: 2,
      page_sizes: [2, 5, 10, 20],
      page_size: 5,
      currentPage: 1,
      hotArticleList: [],
      inputDes: '',
      userList: [
        { 'avatar': 'https://p1-q.mafengwo.net/s19/M00/37/17/CoNB_GRTjIsfBd4ZADFHl9-2s7s.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg', nickname: 'hh', introduction: 'hahahahahahahhahahahahahahahaha', createtime: '2022-04-21' },
        { 'avatar': 'https://p1-q.mafengwo.net/s19/M00/37/17/CoNB_GRTjIsfBd4ZADFHl9-2s7s.png?imageView2%2F2%2Fw%2F1920%2Fq%2F90%2Fformat%2Fjpeg', nickname: '才怕', introduction: '你好，这里是', gender: 1, createtime: '2022-04-21' }
      ]
    }
  },
  created() {
    this.getList()
  },
  mounted() {

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
  methods: {
    filterContent(value) {
      var reg = /<[^<>]+>/g
      value = value.replace(reg, '') // 把v-html的格式标签替换掉
      if (value.length > 120) {
        return value.slice(0, 120) + '...'
      } else {
        return value
      }
    },
    handleQuery() {
      if (this.radio == 2) {
        this.$router.push({
          name: 'NameCard',
          params: { name: this.inputDes }
        })
      } else {
        var queryList = { pageNum: 2, pageSize: 5 }
        queryList.pageNum = this.currentPage
        queryList.title = this.inputDes
        queryList.pageSize = this.page_size
        get('/api/article/getArticlesByName', queryList).then(res => {
          this.hotArticleList = res.data.data
          console.log(this.hotArticleList)
          this.totalArticle = res.data.total
        })
      }
    },
    notifySecurityInfo() {
      this.$notify.info({
        title: '出境游安全知识提示',
        message: `特别提醒广大游客文明安全出行，随时关注新闻动态，尽量避免去有人身安全风险的国家和地区。文明旅游：营造文明、和谐的旅游环境，关系到每位游客的切身利益。做文明游客是我们大家的义务，克服旅游陋习，倡导文明旅游行为。参考《中国公民出境旅游文明行为指南》。
                  `
      })
    },
    linkProfile(to) {
      console.log('/profile_o/index/' + to)
      this.$router.push('/profile_o/index/' + to)
    },
    linkRegion(to) {
      this.$router.push('/display/index/' + to)
    },
    handleSizeChange(val) { // 改变每页文章数量
      this.page_size = val
      this.getList()
    },
    handleCurrentChange(val) { // 改变当前页号
      this.currentPage = val
      this.getList()
    },
    getList() {
      var queryList = { pageNum: 2, pageSize: 5 }
      queryList.pageNum = this.currentPage

      queryList.pageSize = this.page_size
      get('/api/article/homeLunBo').then((res) => {
        this.lunboComponent = res.data
        console.log(this.lunboComponent)
      })

      get('/api/article/hotQuery', queryList).then((res) => {
        this.hotArticleList = res.data.data
        console.log(this.hotArticleList)
        this.totalArticle = res.data.total
      })

      get('/api/users/knownUsers').then(res => {
        console.log(res.data)
        this.userList = res.data
      })
    }

  }
}
</script>

<style>

  .input-search{
    width: 400px;
    height: 80px;
    background-color: rgba(96, 86, 75,.6);
    border-radius: 4px;
    position: absolute;
    bottom: 70px;
    left: 37%;

  }

  .el-radio__input + .el-radio__label {
  color: white !important;
  }
  /* 选中后小圆点的颜色 */
  .el-radio__input.is-checked .el-radio__inner {
    background: #ff9d00 !important;
    border-color: #ff9d00 !important;

  }

  .card{
    border: #9d9d9d 1px solid;
    border-radius: 10px;
    padding-top:10px;
    margin-top:20px;
    height:60px;
    width:200px;
    position: relative;
  }
  .article{
    background-color: white;
    border: hidden;
  }
  .article:hover{
    background-color: #f8f8f8;
  }

  .article-text{

  }

  .article-title:hover{
    color:#ff9d00;
  }

  .userWrapper{

    height:900px;
    box-shadow: 2px 2px 6px #d1d9e6,-2px -2px 6px #f9f9f9;
    border: #e8e8ed 1px solid;
  }
</style>
