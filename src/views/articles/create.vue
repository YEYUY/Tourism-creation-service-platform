<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="cover-container" style="position:ralative;">
        <!-- 背景图片 -->
        <img :src="postForm.cover" style="object-fit:cover;height:100%;width:100%;z-index:-1;">
        <!-- 上传图片按钮 -->
        <div v-if="!image_set" class="uploadImg" style="left:35%;margin-top:-350px;height:100px;width:600px;background-color:;z-index:2;position:absolute">
          <span style="display:inline-block;width:25%;height:100%;vertical-align:top;">
            <i class="el-icon-picture-outline-round" style="margin-left:25%;margin-top:12%;font-size:70px;color:#609889;" />
            <el-button type="text" @click="dialogFormVisible = true">
              <i class="el-icon-edit icon" style="" />
            </el-button>

          </span>
          <span style="display:inline-block;width:75%;height:100%;vertical-align:top;">
            <h3 style="margin-top:25px;margin-bottom:5px">设置游记头图</h3>
            <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
          </span>

        </div>
        <!-- 标题输入框 -->
        <div v-if="image_set" class="title-wrapper" style="margin-bottom: 40px;margin-top:-200px;">
          <el-button type="text" @click="dialogFormVisible = true">
            <i class="el-icon-edit icon" style="font-size:20px">编辑封面</i>
          </el-button>
          <el-form-item prop="title">

            <el-input v-model="postForm.title" :maxlength="100" name="name" required placeholder="输入标题" />
            <!-- <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
              标题
            </MDinput> -->
          </el-form-item>
        </div>

        <div v-if="!image_set" class="title-wrapper" style="margin-bottom: 40px;margin-top:-130px;">
          <el-form-item prop="title">
            <el-input v-model="postForm.title" :maxlength="100" name="name" required placeholder="输入标题" />
            <!-- <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
              标题
            </MDinput> -->
          </el-form-item>
        </div>

      </div>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <div class="postInfo-container">
              <el-row>
                <!-- 话题标签填写 -->
                <el-col :span="5">
                  <i class="el-icon-s-flag" style="position:absolute;left:50px;top:8px;font-size:20px;color:#00809d" />
                  <el-form-item label-width="120px" label="标签:" class="postInfo-container-item">
                    <el-input v-model="postForm.tags" type="text" placeholder="输入话题/标签" />
                  </el-form-item>
                </el-col>
                <!-- 区域填写 -->
                <el-col :span="5">
                  <i class="el-icon-location-outline" style="position:absolute;left:23%;top:8px;font-size:20px;color:#00809d" />
                  <el-form-item label-width="120px" label="区域:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.region"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入地区名称"
                      :remote-method="remoteMethod"
                      :loading="loading"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- 草稿选择 -->
                <el-col :span="5">
                  <i class="el-icon-document-copy" style="position:absolute;left:44%;top:8px;font-size:20px;color:#00809d" />
                  <el-select v-model="postForm.id" clearable placeholder="选择恢复的草稿" style="margin-left:80px;" @change="selectDraft(postForm.id)">
                    <!-- value是选后的值  label是显示的值 -->
                    <el-option
                      v-for="item in drafts"
                      :key="item.value"
                      :label="item.title"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>

                <!-- 发布文章选择 -->
                <el-col :span="5">
                  <i class="el-icon-collection" style="position:absolute;left:65%;top:8px;font-size:20px;color:#00809d" />
                  <el-select v-model="postForm.id" clearable placeholder="选择已发布文章修改" style="margin-left:80px;" @change="selectDraft(postForm.id)">
                    <!-- value是选后的值  label是显示的值 -->
                    <el-option
                      v-for="item in publicians"
                      :key="item.value"
                      :label="item.title"
                      :value="item.id"
                    />
                  </el-select>
                </el-col>

                <el-col :span="4">
                  <el-button v-if="postForm.status == 0" type="success">处于发布状态</el-button>

                  <el-button v-if="postForm.status == 1" type="warning">处于草稿状态</el-button>

                  <el-button v-if="postForm.status == 2" type="primary">处于编辑状态</el-button>
                </el-col>

              </el-row>

              <el-row>
                <!-- 出发日期选择 -->
                <el-col :span="5">

                  <el-form-item label-width="120px" label="出发日期:" class="postInfo-container-item" prop="starttime">
                    <el-date-picker
                      v-model="postForm.starttime"
                      type="date"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </el-col>

                <!-- 持续天数填写 -->
                <el-col :span="5">
                  <i class="el-icon-c-scale-to-original" style="position:absolute;left:22%;top:8px;font-size:20px;color:#00809d" />
                  <el-form-item label-width="120px" label="持续天数:" class="postInfo-container-item " prop="days">
                    <el-input v-model="postForm.days" type="text" placeholder="请输入天数"><i slot="suffix" style="font-style:normal;margin-right: 10px;color:black">天(Days)</i> </el-input>

                  </el-form-item>
                </el-col>

                <!-- 人物选择 -->
                <el-col :span="8">
                  <i class="el-icon-user" style="position:absolute;left:44%;top:8px;font-size:20px;color:#00809d" />
                  <el-form-item label-width="140px" label="出行人物:" class="postInfo-container-item" prop="indiviuals">
                    <el-checkbox-group v-model="postForm.indivisuals">
                      <el-checkbox label="一个人" />
                      <el-checkbox label="和朋友" />
                      <el-checkbox label="伴侣" />
                      <el-checkbox label="亲子" />
                      <el-checkbox label="和家人" />
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>

                <el-col :span="4">
                  <i class="el-icon-user-solid" style="position:absolute;left:44%;top:8px;font-size:20px;color:#00809d" />
                  <el-form-item label-width="80px" label="人均开销:" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.aveconsume"
                      class="consumeInput"
                      placeholder="请输入人均开销"
                      clearable
                    >
                      <i slot="suffix" style="font-style:normal;margin-right: 10px;color:black">RMB</i>
                    </el-input>
                  </el-form-item>
                </el-col>

              </el-row>

            </div>
          </el-col>
        </el-row>

        <aside>
          温馨提示：处于发布状态或者草稿状态的的文章在提交后都需要审核，请谨慎选择是否修改已发布文章。为了美观，编辑框中的图片请缩小至900px以下。
        </aside>
        <!-- 集成文本编辑器 -->
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" :value="postForm.content" />
        </el-form-item>

      </div>
    </el-form>

    <el-row :gutter="20" style="height:100px">
      <el-col :span="3" :offset="16">
        <!-- 存草稿 -->
        <el-button v-if="postForm.status!=0" type="warning" style="height:50px;width:150px;border-radius:20px" @click="save">存草稿箱</el-button>
      </el-col>
      <el-col :span="3" :offset="0">
        <!-- 提交审核 -->
        <el-button type="primary" style="height:50px;width:150px;border-radius:20px" @click="submit">提交审核</el-button>
      </el-col>
    </el-row>

    <el-dialog title="封面链接上传" :visible.sync="dialogFormVisible">
      <Warning />
      <el-form :model="form">
        <el-form-item label="图片链接:">
          <el-input v-model="form.img_uri" autocomplete="off" style="width:500px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateImgUri">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import requeest from '@/utils/request'
import { mapGetters } from 'vuex'
import { get } from '@/utils/request'

const defaultForm = {
  // 状态(0发布，1草稿，2删除，3待审核，4被拒)
  status: 2,
  title: '', // 文章题目
  content: '', // 文章内容
  region: '', // 区域
  cover: 'https://pic1.zhimg.com/v2-780edcc54351725965dc76dd891a04f8_r.jpg', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  tasg: '',
  author: '',
  starttime: '',
  indivisuals: ['一个人'],
  days: '',
  aveconsume: undefined

}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, Warning },
  data() {
    // 验证是否为空
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      id: undefined,
      image_set: false,
      dialogFormVisible: false,
      postForm: Object.assign({}, defaultForm), // 复制初始表单
      loading: false,
      rules: { // 自定义验证方式
        cover: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }, { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }],
        region: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        starttime: [{ validator: validateRequire }],
        days: [{ validator: validateRequire }]

      },
      form: {
        img_uri: ''
      },
      drafts: [ // 草稿列表
      ],
      publicians: [ // 发布文章列表
      ],
      list: [],
      option: [],
      loading: false

    }
  },
  computed: {
    displayTime: {
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    },
    ...mapGetters([
      'name'
    ])

  },
  mounted() {

  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.updateDrafts()
    this.tempRoute = Object.assign({}, this.$route)
    this.updatePubs()
    this.getRegionList()
  },
  methods: {
    getRegionList() {
      get('api/destination/getRegionList').then(res => {
        var temp = []
        res.data.forEach(item => {
          temp.push(item.name)
        })

        this.list = temp

        console.log(this.list)
      })
    },
    save() { // 保存草稿
      // console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 1

          this.postForm.author = this.name // 设置author字段
          var tempForm = Object.assign({}, this.postForm)
          tempForm.indivisuals = this.postForm.indivisuals.join('/')

          requeest.post('/api/article/saveDraft', tempForm).then(response => { // 拿到后端返回值
            this.$notify({
              title: '成功',
              message: '文章成功保存至草稿箱',
              type: 'success',
              duration: 2000
            })
          })
          this.loading = false
        } else {
          console.log('保存草稿出错!!')
          return false
        }
      }),
      this.updateDrafts()
    },
    submit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 3 // 待审核

          this.postForm.author = this.name // 设置author字段
          console.log(this.name)
          var tempForm = Object.assign({}, this.postForm)
          tempForm.indivisuals = this.postForm.indivisuals.join('/')
          requeest.post('/api/article/savePub', tempForm).then(response => { // 拿到后端返回值
            this.$notify({
              title: '成功',
              message: '文章成功提交审核',
              type: 'success',
              duration: 2000
            })
          })
          this.loading = false
        } else {
          this.$notify({
            title: '失败',
            message: '文章提交出错',
            type: 'info',
            duration: 2000
          })
          return false
        }
      }),
      this.updatePubs()
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    updateImgUri() { // 更新上传的图片链接
      this.postForm.cover = this.form.img_uri
      this.dialogFormVisible = false
      this.image_set = true
    },
    selectDraft(id) {
      var did = +id
      // 传id去后端获取数据
      get('/api/article/getDraft', { did }).then(res => {
        var article = res.data

        this.postForm.id = id
        this.postForm.content = article.content
        console.log('文章')
        console.log(article)
        this.postForm.title = article.title
        this.postForm.region = article.region
        this.postForm.tags = article.tags
        this.form.img_uri = article.cover
        // console.log(this.form.img_uri);
        this.image_set = 1
        this.postForm.days = article.days
        this.postForm.starttime = article.starttime
        this.postForm.aveconsume = article.aveconsume
        this.postForm.indivisuals = article.indivisuals.split('/')
        this.updateImgUri()
      })
    },
    updateDrafts() {
      var listQuery = {}
      listQuery.nickname = this.name
      console.log(this.name)
      get('/api/article/getDrafts', listQuery).then(res => {
        console.log(res)
        this.drafts = res.data
      })
    },
    updatePubs() {
      var listQuery = {}
      listQuery.nickname = this.name
      console.log(this.name)
      get('/api/article/getPubs', listQuery).then(res => {
        console.log(res)
        this.publicians = res.data
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.indexOf(query) > -1
          })
          var b = ['婺源', '龙港', '宜山', '马站']
          this.options = Array.from(new Set([...this.options, ...b]))
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import "~@/styles/mixin.scss";

.title-wrapper{
  padding: 40px 25% 20px 30%;
}

.icon{
  margin-left:-2%;margin-top:12%;font-size:30px;color:#609889;font-weight:bold
}
.icon:hover{
  color:#46777d
}

.createPost-container {
  position: relative;

  .cover-container{
    width:100%;
    height:600px;
  }

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

</style>
