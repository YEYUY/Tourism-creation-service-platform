<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.username" disabled />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model.trim="user.nickname" disabled />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model.trim="user.phone" disabled />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
  }
}
</script>
