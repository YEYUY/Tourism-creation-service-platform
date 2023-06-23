<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix" style="font-size:16px;font-weight:bold;height:25px;">
      <div style="float:left;height:100%">
        <span style="text-align:center;vertical-align:top">个人名片</span>
        <el-button type="text" style="margin-top:-20px;padding-left:10px" @click="dialog = true"> <i class="el-icon-edit">编辑</i>
        </el-button>
      </div>

      <el-drawer
        ref="drawer"
        title="个人信息"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
      >
        <div class="demo-drawer__content">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>
            <!-- 性别 -->
            <el-form-item v-if="form.gender != null" label="性别" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 个人介绍 -->
            <el-form-item label="个人介绍" prop="introduction">

              <el-input
                v-model="form.introduction"
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
              />
              <aside>
                有亮点、恰当的个人介绍能增加自己文章的阅读量！
              </aside>
            </el-form-item>

          </el-form>
          <div class="demo-drawer__footer" style="float:right;margin-right:100px">
            <el-button type="danger" @click="handleDisappear()">注销</el-button>
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>

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
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false" referrer="no-referrer|origin|unsafe-url">

          <div class="" style="padding-top:10px">
            <!-- <el-upload :action="reqUrl" list-type="picture-card" :http-request="uploadSectionFile"
              :on-remove="handleRemove" >
              <i class="el-icon-plus">上传头像</i>
            </el-upload> -->

            <el-upload
              class="avatar-uploader"
              :action="reqUrl"
              :show-file-list="false"
              :http-request="uploadSectionFile"
              style="height:30px;width:60px"
            >

              <i class="el-icon-plus avatar-uploader-icon" />
              <div>
                <span>上传</span>
              </div>
            </el-upload>
          </div>

        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">昵称：{{ user.nickname }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="user" /><span>个人介绍</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduction }}
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
      type: Object
    },
    likeMap: {
      type: Object,
      default: () => {
        return {
        }
      }
    }

  },
  data() {
    var checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (value.size() > 0 && value.size() != 11) {
          callback(new Error('电话位数不为11'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      reqUrl: '/uploadImg',
      imgUrl: '',
      dialog: false,
      loading: false,
      time: undefined,
      form: { password: '', nickname: '', phone: '', introdution: '', gender: 0 },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.form = Object.assign({}, this.user)
    console.log('🚀 ~ file: UserCard.vue:198 ~ created ~ this.form.gender:', this.form.gender)
  },
  methods: {
    // 点赞功能实现
    async like() {
      const userId = this.user.id
      const entityId = this.user.id
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
    test() {

    },
    toProfile(title) {
      this.$router.push('/destination/index')
      this.$message({
        showClose: true,
        message: 'Welcome',
        type: 'success'
      })
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交修改后的个人信息吗？')
        .then(_ => {
          this.loading = true
          delete this.form.role
          var tempForm = Object.assign({}, this.form)
          console.log('🚀 ~ file: UserCard.vue:243 ~ handleClose ~ tempForm:', tempForm)
          request.post('/api/users/update', tempForm).then(response => { // 拿到后端返回值
            if (response.code == 200) {
              this.$notify({
                title: '提示信息',
                message: '个人信息更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '提示信息',
                message: '昵称重复，请重新再试！',
                type: 'info',
                duration: 2000
              })
            }
          })
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
              this.$router.go(0)
            }, 400)
          }, 1000)
        })
        .catch(_ => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    // 以下是重点，覆盖默认上传方法
    uploadSectionFile(params) {
      var tempForm = Object.assign({}, this.user)
      const formData = new FormData()
      formData.append(params.filename, params.file)
      request.post(params.action, formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(res => {
        this.imgUrl = res.data
        tempForm.avatar = this.imgUrl

        request.post('/api/users/update', tempForm).then(response => { // 拿到后端返回值
          if (response.code == 200) {
            this.$notify({
              title: '提示信息',
              message: '头像更新成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: '提示信息',
              message: '头像上传失败！',
              type: 'info',
              duration: 2000
            })
          }
        })
      })
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
    color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
  }

</style>
