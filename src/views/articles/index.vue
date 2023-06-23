<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.currentStatus" placeholder="状态" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in statusOpt" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.tags" placeholder="话题/标签" style="width: 200px;margin-right:10px" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <!--
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          增加
        </el-button>
      -->
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="创建时间" prop="createtime" width="120px" align="center" sortable="">
        <template slot-scope="{row}">
          <span>{{ row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updatetime" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" prop="title" width="250px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>

        </template>
      </el-table-column>
      <el-table-column label="创作者" prop="author" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="旅游标签" prop="tags" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tags }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" align="center" width="100" prop="readings" sortable="">
        <template slot-scope="{row}">
          <span>{{ row.readings }}</span>

        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100" prop="status">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status| statusFilter1 }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" min-width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- 没删除就能编辑 -->
          <router-link :to="{name:'Display',params:{id:row.id} }" style="margin-right:10px">
            <el-button v-if="row.status!=2" type="primary" size="mini">
              查看
            </el-button>
          </router-link>

          <!-- 待审批才能审批 -->
          <el-button v-if="row.status==3" size="mini" type="success" @click="handleModifyStatus(row,0)">
            审批
          </el-button>
          <!-- 不是草稿才能存入草稿 -->
          <el-button v-if="row.status!=1 " size="mini" @click="handleModifyStatus(row,1)">
            存入草稿
          </el-button>
          <!-- 不是已删除才能被删除 -->
          <el-button v-if="row.status!=2" size="mini" type="danger" @click="handleModifyStatus(row,2)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <input v-model="temp.updatetime" type="datetime" disabled="true/">
        </el-form-item>
        <el-form-item label="标签/话题" prop="tags">
          <el-input v-model="temp.tags" />
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 10}" type="textarea" placeholder="Please input" />
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

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { get } from '../../utils/request'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger',
        3: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    statusFilter1(status) {
      const statusMap = {
        0: '发布',
        1: '草稿',
        2: '已删除',
        3: '待审批'
      }
      return statusMap[status]
    }

  },
  data() {
    return {
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
        sort: '+id'
      },
      statusOpt: [{
        value: '0',
        label: '发布'
      }, {
        value: '1',
        label: '草稿'
      }, {
        value: '2',
        label: '删除'
      }, {
        value: '3',
        label: '待审核'
      }],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID 升序', key: '+id' }, { label: 'ID 降序', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted', 'to be reviewed'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑/查看攻略',
        create: '新建攻略'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        tags: [{ required: true, message: 'tags is required', trigger: 'change' }],
        updatetime: [{ type: 'date', required: true, message: 'updateTime is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true

      get('/api/article/getArticleById', this.listQuery).then((res) => {
        console.log(res.data)
        const article = res.data
        console.log(article)
      })

      get('/api/article/listAll', this.listQuery).then((res) => {
        console.log(res.data)
        this.list = res.data.data
        this.total = res.data.total
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      get('/api/article/listQuery', this.listQuery).then((res) => {
        console.log(res.data)
        this.list = res.data.data
        this.total = res.data.total
      })
      this.listLoading = false
    },
    handleModifyStatus(row, status) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.status = status
      console.log(this.temp)
      updateArticle(this.temp).then(() => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Status change Successfully',
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
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj

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
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update/Scan Successfully',
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
