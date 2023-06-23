<template>
  <div class="tab-container">
    <el-tag style="font-size:20px;">欢迎登录逍遥游后台管理。你好，<span style="font-weight:bold">{{ name }}！</span></el-tag>
    <el-tag style="font-size:20px;display:block;width:200px;margin-top:20px" type="success">使用者统一管理面板</el-tag>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <admin v-if="activeName=='admin' " />
          <editor v-if="activeName=='edit' " />
          <user v-if="activeName=='user' " />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import admin from './components/admin'
import editor from './components/editor'
import user from './components/user'
import { mapGetters } from 'vuex'
export default {
  name: 'Tab',
  components: { admin, editor, user },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tabMapOptions: [
        { label: '超级管理员', key: 'admin' },
        { label: '审核员', key: 'edit' },
        { label: '普通用户', key: 'user' }
      ],
      activeName: 'admin'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
