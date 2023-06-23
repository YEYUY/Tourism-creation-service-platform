<template>
  <el-container>
    <el-header class="header" style="height:75px">
      <div>
        <i class="el-icon-collection">逍遥游</i>
        <span class="headerTitle" style="font-size:22px">
          创作服务平台
        </span>
      </div>

      <el-tooltip placement="bottom">
        <div slot="content">逍遥游是balabala<br>在这里你可以balalala</div>
        <el-button type="text" style="font-size:18px;color:#978888;margin-right:30px">关于我们</el-button>
      </el-tooltip>
    </el-header>

    <!-- 主体部分 -->
    <el-main class="main">
      <!-- <div class="loginContainer">
        <div style="width:650px;padding:0px 200px;margin-top:-10px">
          <span style="font-size:24px;font-weight:600">加入我们</span>
          <br>
          <span style="font-size:24px;font-weight:600;">解锁旅游爱好者专属功能</span>
          <br>
          <span style="color:#98a2af">让创作发布、攻略查询、旅游畅玩变更有趣。</span>
          <div class="circle">
            <video  style="object-fit:fill;width:100%;height: 100%;" autoplay="autoplay" muted="muted" loop="loop" class="video">
              <source src="http://storage.live.com/items/C4E09C51528A820E!147:/snow山.mp4" type="video/mp4">
              您的浏览器不支持此类视频。
            </video>
          </div>
        </div>
        <el-form class="loginForm" :model="loginForm" ref="loginForm" :rules="rules" :inline="false" size="normal" style="margin-right:150px" >
          <el-form-item>
            <div class="loginTitle">系统登录</div>
          </el-form-item>

          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-button class="btn" type="primary" size="default" @click="handleLogin">登录</el-button>

              </el-col>
              <el-col :span="12" :offset="0">
                <el-button class="btn" type="default" size="default" >注册</el-button>
              </el-col>
            </el-row>

          </el-form-item>
        </el-form>

      </div> -->

      <div class="shell">
        <!-- 登录容器 -->
        <div id="b-container" class="container b-container">

          <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" :inline="false" size="normal" class="form">
            <h2 class="form-title title">登入账号</h2>
            <span class="form-span">请输入账号、密码登录</span>
            <el-form-item label="用户名">
              <input v-model="loginForm.username" class="form-input" placeholder="请输入用户名">
            </el-form-item>
            <el-form-item label="密码">
              <input v-model="loginForm.password" class="form-input" type="password" placeholder="请输入密码">
            </el-form-item>
            <el-button type="text" class="form-link" style="padding-top:20px" @click="dialogFormVisible=true">忘记密码?</el-button>
            <el-button type="primary" class="button form-button submit" @click="handleLogin">登录 Sign In</el-button>
          </el-form>
        </div>

        <!-- 注册容器 -->
        <div id="a-container" class="container a-container">
          <el-form ref="signForm" :model="signForm" :rules="rules" label-width="80px" :inline="false" size="normal" class="form">
            <h2 class="form-title title">创建账号</h2>
            <span class="form-span">请输入账号、密码注册</span>
            <el-form-item label="用户名">
              <input v-model="signForm.username" class="form-input" placeholder="请输入用户名">
            </el-form-item>
            <el-form-item label="密码">
              <input v-model="signForm.password" type="password" class="form-input" placeholder="请输入密码">
            </el-form-item>
            <el-button type="primary" class="button form-button submit" @click="handleSign">注册 Sign Up</el-button>
          </el-form>
        </div>

        <div id="switch-cnt" class="switch">
          <div class="switch_circle" />
          <div class="switch_circle switch_circle-t" />
          <div class="switch-circle switch_circle-t1">
            <video style="object-fit:fill;width:100%;height: 100%;" autoplay="autoplay" muted="muted" loop="loop" class="video">
              <source src="http://storage.live.com/items/C4E09C51528A820E!147:/snow山.mp4" type="video/mp4">
              您的浏览器不支持此类视频。
            </video>
          </div>
          <!-- 注册配套 -->
          <div id="switch-c1" class="switch_container is-hidden">
            <h2 class="title1">加入我们</h2>
            <h2>解锁旅游创作者专属功能</h2>
            <p class="switch-discription discription">已经有账号了吗？去登入账号来进入广阔天地吧 ！！！</p>
            <button class="switch-button button switch-btn">去登录</button>
          </div>
          <!-- 登录配套 -->
          <div id="switch-c2" class="switch_container ">
            <h2 class="title1" style="letter-spacing:0;">Hello Friend ！</h2>
            <h2>体验旅游创作者专属功能</h2>
            <p class="switch-discription discription">让创作发布、攻略查询、旅游畅玩变更有趣。</p>
            <button class="switch-button button switch-btn">去注册</button>
          </div>
        </div>
      </div>

      <div class="footer">
        <div><span style="font-size:10px">沪ICP备 5201314号 Copyright © 2020-2023
        </span>
        </div>
        <div><span style="font-size:10px">上海大学新世纪大学生村24幢402有限公司
        </span>
        </div>

      </div>

      <!-- 找回密码表单 -->
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px" :inline="false" size="normal" class="form">
          <el-form-item label="用户名">
            <input v-model="updateForm.username" class="form-input" placeholder="请输入用户名">
          </el-form-item>
          <el-form-item label="密码">
            <input v-model="updateForm.password" class="form-input" type="password" placeholder="请输入密码">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="button1" type="info" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" class="button1" @click="handleUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script scoped>
import requeest from '@/utils/request'
export default {
  data() {
    return {
      // 登录数据域
      loginForm: {
        username: 'cpacpa',
        password: 'cmjcmj123'

      },
      signForm: {
        username: undefined,
        password: undefined,
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        nickname: undefined,
        createTime: undefined
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      updateForm: {
        username: '',
        password: ''

      }
    }
  },
  created() {
    this.$nextTick(() => {
      console.log('页面加载完啦~')
      this.handelChangeForm()
    })
  },
  methods: {
    // 登录提交事件
    handleLogin() {
      this.$refs.loginForm.validate(valid => { // 表演验证通过后可以进入
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm) // 触发user模块下login方法,把loginForm提交
            .then(() => {
              console.log('登录后正跳转到主页')
              this.$router.push('/')
              this.loading = false
            })
            .catch((error) => {
              this.$notify.error({
                title: '登录失败',
                message: '用户名或密码错误'
              })
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSign() {
      this.$refs.signForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.signForm.nickname = this.signForm.username
          this.signForm.roldId = 1 // 普通角色
          requeest.post('/api/users/signUp', this.signForm).then(response => { // 拿到后端返回值
            console.log(response)
            var { code } = response
            if (code == 500) {
              this.$notify.error({
                title: '注册错误',
                message: '用户名重复'
              })
            } else {
              this.$notify.success({
                title: '注册成功',
                message: '恭喜你，注册成功。请记住你的用户名和密码。'
              })
            }
          })
        }
      })
    },
    handleUpdate() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          this.loading = true
          requeest.post('/api/users/updatePassward', this.updateForm).then(response => { // 拿到后端返回值
            console.log(response)
            var { code } = response
            if (code == 500) {
              this.$notify.error({
                title: '信息提示(hint)',
                message: '修改密码失败,用户名不存在'
              })
            } else {
              this.$notify.success({
                title: '信息提示(hint)',
                message: '修改成功！！快用新的密码登录逍遥游为你量身打造的创作领域吧！。'
              })
            }
          })
        }
      })
    },
    handelChangeForm() {
      const switchCtn = document.querySelector('#switch-cnt')
      // console.log(switchCtn);
      const switchC1 = document.querySelector('#switch-c1')
      // console.log(switchC1);
      const switchC2 = document.querySelector('#switch-c2')
      const switchCircle = document.querySelectorAll('.switch_circle')
      const switchBtn = document.querySelectorAll('.switch-btn')
      // let allButtons = document.querySelectorAll(".submit");
      const aContainer = document.querySelector('#a-container')
      const bContainer = document.querySelector('#b-container')

      // let getButtons = (e)=>e.preventDefault();
      const changeForm = (e) => {
        console.log('触发表单转换')
        switchCtn.classList.add('is-gx')
        setTimeout(function() {
          switchCtn.classList.remove('is-gx')
        }, 1500)
        switchCtn.classList.toggle('is-txr')
        switchCircle[0].classList.toggle('is-txr')

        switchCircle[1].classList.toggle('is-txr')

        switchC1.classList.toggle('is-hidden')
        switchC2.classList.toggle('is-hidden')
        aContainer.classList.toggle('is-txl')
        bContainer.classList.toggle('is-txl')

        aContainer.classList.toggle('is-z')
      }
      const shell = (e) => {
        // for(var i=0;i<allButtons.length;i++){
        //   allButtons[i].addEventListener("click",getButtons);
        // }
        for (var i = 0; i < switchBtn.length; i++) {
          console.log(switchBtn[i])
          switchBtn[i].addEventListener('click', changeForm)
        }
      }
      window.addEventListener('click', shell)
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  margin:0px;
  padding:0px;
  box-sizing: border-box;
  //字体无法选中
  user-select: none;
}

.header{

  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-icon-collection{
    color: #5b92e1;
    padding-right: 10px;
    padding-left:10px;
    font-size:25px;

  }
  .headerTitle{
    font-weight: 600;
    font-size: 18px;
  }
}
.circle{
  margin-top:30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width:200px;
  height:200px;
}

.main{
  //background-image: linear-gradient(to right bottom , #f6f8fd,#f8e4e5, #d7e9f6);

  width: 100%;
  height:100%;
  height:800px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #a0a5a8;
  background-color: #ecf0f3;
}
.shell{
  position:relative;
  width:1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding:25px;
  background-color: #ecf0f3;
  box-shadow:-10px -10px 10px #f9f9f9,10px 10px 10px #d1d9e6;
  border-radius: 12px;
  overflow: hidden;
}

@media(max-width:1200px){
  .shell{
    transform: scale(0.7);
  }
}
@media(max-width:1000px){
  .shell{
    transform: scale(0.6);
  }
}
@media(max-width:800px){
  .shell{
    transform: scale(0.5);
  }
}
@media(max-width:600px){
  .shell{
    transform: scale(0.4);
  }
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  width:600px;
  height:100%;
  padding:25px;
  background-color: #ecf0f3;
  transition: 1.25s;
}

.form{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height:100%;
}

.form-input{
  width:250px;
  height:40px;
  margin:4px 0;
  padding-left: 25px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.form-input:focus{
  box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}
.form-span{
  margin-bottom:12px;
  margin-top:-10px;
}
.title1{
  font-size:30px;
  font-weight: 700;
  line-height: 3;
  color:#181818;
  letter-spacing: 5px;
  margin-bottom:120px;
}

.title{
  font-size:30px;
  font-weight: 700;
  line-height: 3;
  color:#181818;
  letter-spacing: 5px;

}
.discription{
  font-size:14px;
  letter-spacing: 0.25px;
  text-align: center;
  line-height: 1.6;
}

.button{
  width:180px;
  height: 50px;
  border-radius: 25px;
  margin-top:30px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #4B70E2;
  color: white;
  border: none;
  outline: none;
  box-shadow: 8x 8x 16px #d1d9e6,-8px -8px 16px #f9f9f9;
}

.button1{
  width:90px;
  height: 50px;
  border-radius: 25px;
  margin-top:10px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;

  color: white;
  border: none;
  outline: none;
  box-shadow: 8x 8x 16px #d1d9e6,-8px -8px 16px #f9f9f9;
}

.a-container{
  z-index:0;
  left:calc(100% - 600px);
  }
.b-container{
  z-index: 100;
  left:calc(100% - 600px);
}
.switch{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top:0;
  left:0;
  height:100%;
  width:400px;
  padding:50px;
  z-index: 200;
  transition: 1.25s;
  background-color: #ecf0f3;
  overflow: hidden;
  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}
.switch_circle{
  position: absolute;
  width:500px;
  height:500px;
  border-radius: 50%;
  background-color: #ecf0f3;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  bottom:-60%;
  left:-60%;
  transition: 1.25s;
}
.switch_circle-t{
  top:-30%;
  left:60%;
  width:300px;
  height:300px;
}

.switch_circle-t1{
  position: absolute;
  width:120px;
  height:120px;
  z-index: 500;
  overflow: hidden;
  border-radius: 50%;
  top:33%;
  left:33%;

}
.switch_container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width:400px;
  padding: 50px 55px;
  transition: 1.25s;
}
.switch-button{
  cursor: pointer;
}
.switch-button:hover,
.submit:hover{
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
}
.submit-button:focus,
.switch-button:active{
  box-shadow: 2px 2px 6px #d1d9e6,-2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr{
  left:calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}
.is-txl{
  left:0;
  transition: 1.25s;
  transform-origin: right;
}
.is-z{
  z-index:200;
  transition: 1.25s;
}
.is-hidden{
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}
.is-gx{
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100%{
    width:400px;
  }
  30%,
  50%{
    width:500px;
  }

}

.loginContainer{
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:-100px;
  .loginForm{
    background-color: white;
    height:400px;
    width:400px;
    border-radius: 20px;
    box-shadow: 0 0 25px #cac6c6;
    padding: 20px 35px;
    .loginTitle{
      font-weight: 600;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn{
      width:100%;
      border-radius: 10px;
    }
  }

}
.footer{
  position: absolute;
  bottom:80px;
  justify-content: center;
  align-items: center;
  color: #b099a6;
}
</style>
