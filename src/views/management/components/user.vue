<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 输入username查询 -->
      <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- 选择status查询 -->
      <el-select v-model="listQuery.currentStatus" placeholder="状态" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in statusOpt" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>

      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            增加
        </el-button>  -->

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="adminList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createtime" width="200px" align="center" sortable="">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" width="250px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" prop="password" width="250px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="200" prop="status">
        <template slot-scope="{row}">
          <el-tag :type="row.valid | statusFilter">
            {{ row.valid| statusFilter1 }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- <el-button v-if="row.valid==1" size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button> -->
          <el-button v-if="row.valid==1 && row.nickname!=name" size="mini" type="danger" @click="handleModifyStatus(row,0)">
            删除
          </el-button>
          <el-button v-if="row.valid==0" size="mini" type="info">
            已经删除，无法修改
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { get } from '@/utils/request'
import request from '@/utils/request' // 封装axios的文件

export default {
  name: 'UserTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) { // 根据状态确定type
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    },
    statusFilter1(status) { // 根据状态确定标签值
      const statusMap = {
        0: '已删除',
        1: '有效'
      }
      return statusMap[status]
    }

  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      adminList: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        id: 6,
        currentStatus: undefined,
        title: undefined,
        tags: undefined,
        sort: '+id',
        roleId: 2
      },
      statusOpt: [{ value: '1', label: '有效' }, { value: '0', label: '已删除' }],
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        username: '',
        password: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑管理员',
        create: '新增管理员'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }, { min: 3, max: 10, message: '用户名长度应为3-10个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 16, message: '密码长度应为6-16个字符', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取 admin 列表
      this.listLoading = true
      get('/api/users/getUser', this.listQuery).then(res => {
        this.adminList = res.data.data
        this.total = res.data.total
      })
      this.listLoading = false
    },
    handleFilter() { // 根据输入查询
      this.listQuery.pageNum = 1
      get('/api/users/listQuery', this.listQuery).then((res) => {
        this.adminList = res.data.data
        this.total = res.data.total
      })
      this.listLoading = false
    },
    handleModifyStatus(row, status) {
      this.temp = Object.assign({}, row)
      this.temp.valid = status
      console.log('🚀 ~ file: admin.vue:189 ~ handleModifyStatus ~ this.temp:', this.temp)
      request.post('/api/users/saveOrUpdate', this.temp).then(() => {
        const index = this.adminList.findIndex(v => v.id === this.temp.id)
        this.adminList.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '信息提示',
          message: '删除管理员成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.createData()
    },
    createData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          var tempData = Object.assign({}, this.temp)
          delete tempData.updatetime
          delete tempData.id
          request.post('/api/users/saveOrUpdate', tempData).then((res) => {
            this.dialogFormVisible = false
            this.$notify({
              title: '信息提示',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
          this.$router.go(0)
        }
      })
    },
    handleUpdate(row) { // 编辑管理员
      this.temp = Object.assign({}, row)
      const year = new Date().getFullYear() // 获取当前时间的年份
      const month = new Date().getMonth() + 1 // 获取当前时间的月份
      const day = new Date().getDate() // 获取当前时间的天数
      let hours = new Date().getHours() // 获取当前时间的小时
      let minutes = new Date().getMinutes() // 获取当前时间的分数
      let seconds = new Date().getSeconds() // 获取当前时间的秒数
      // 当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      // 拼接格式化当前时间
      this.temp.updatetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      this.dialogStatus = 'update'
      this.dialogFormVisible = true // 使表单可见
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    updateData() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          var tempData = Object.assign({}, this.temp)
          delete tempData.updatetime
          request.post('/api/users/saveOrUpdate', tempData).then((res) => {
            const index = this.adminList.findIndex(v => v.id === this.temp.id)
            this.adminList[index].username = tempData.username
            this.adminList[index].password = tempData.password
            console.log('🚀 ~ file: admin.vue:286 ~ request.post ~ this.adminList[index]:', this.adminList[index])
            this.dialogFormVisible = false
            this.$notify({
              title: '信息提示',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'createtime', 'updatetime', 'title', 'author', 'tags', 'status']
        const filterVal = ['id', 'createtime', 'updatetime', 'title', 'author', 'tags', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
