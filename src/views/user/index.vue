<template>
  <div class="app-container">
    <Table
      :table-data="list"
      :table-columns="tableColumns"
      :current-page="formData.page_index"
      :page-size="formData.page_number"
      :total-page="formData.totalPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        slot="operate"
        label="操作"
        align="center"
        width="300"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="openDialog(0,row.userId)">监控</el-button>
          <el-button type="success" size="mini" @click="openDialog(1,row.userId)">配置</el-button>
          <el-button type="warning" size="mini" @click="openDialog(0,row.userId)">停用</el-button>
          <el-button type="danger" size="mini" @click="openDialog(1,row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Table from '@/components/Table'

export default {
  components: {
    Table
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      formData: {
        page_index: 1,
        page_number: 10,
        totalPage: 0
      },
      tableColumns: [{
        type: 'index',
        label: '序号',
        width: '95'
      }, {
        label: '集群',
        prop: 'title'
      }, {
        label: '域名',
        prop: 'author',
        width: '110px'
      }, {
        label: '跳转地址',
        prop: 'pageviews',
        width: '110px'
      }, {
        label: '所属分组',
        prop: 'status',
        width: '110px'
      }, {
        label: '创建时间',
        prop: 'display_time',
        width: '200px'
      }, {
        slot: 'operate'
      }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.formData.totalPage = response.data.items.length
      //   this.listLoading = false
      // })
    },
    handleSizeChange(pageNum) {

    },
    handleCurrentChange(pageIndex) {

    }
  }
}
</script>
