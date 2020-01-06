<template>
  <div class="app-container">
    <Table
      :table-data="list"
      :table-columns="tableColumns"
      :current-page="formData.page_index"
      :page-size="formData.page_number"
      :total-page="formData.totalPage"
    >
      <el-table-column slot="is_active" label="是否激活" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.is_active">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column slot="is_superuser" label="管理员" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.is_superuser">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column slot="operate" label="操作" align="center" width="260px">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="openDialog(0,row.userId)">设置密码</el-button>
          <el-button type="info" size="mini" @click="openDialog(1,row.userId)">修改</el-button>
          <el-button type="danger" size="mini" @click="openDialog(1,row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'
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
      tableColumns: [
        {
          type: 'index',
          label: '序号',
          width: '95'
        },
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '手机号',
          prop: 'phone'
        },
        {
          // label: '是否激活',
          // prop: 'is_active'
          slot: 'is_active'
        },
        {
          // label: '管理员',
          // prop: 'is_superuser'
          slot: 'is_superuser'
        },
        {
          label: '到期时间',
          prop: 'valid_to_date'
        },
        {
          label: '更新时间',
          prop: 'valid_to_date'
        },
        {
          slot: 'operate'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserList().then(res => {
        this.list = res.data.results
        this.formData.totalPage = res.data.count
        this.listLoading = false
      })
    },
    handleSizeChange(pageNum) {

    },
    handleCurrentChange(pageIndex) {

    }
  }
}
</script>
