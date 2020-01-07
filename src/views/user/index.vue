<template>
  <div v-loading="listLoading" class="app-container">
    <div slot="header">
      <el-form ref="form" size="small" :model="formData" :inline="true">
        <el-form-item label="关键词">
          <el-input v-model="formData.keyWord" />
        </el-form-item>
        <!-- <el-form-item label="分组">
          <el-select v-model="formData.region" placeholder="请选着分组" clearable>
            <el-option
              v-for="item in groupData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="状态">
          <el-select v-model="formData.region" placeholder="请选着状态" clearable>
            <el-option v-for="item in statusType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="filterSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="$router.push('add-user')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          <el-button type="primary" size="mini" @click="showResetPsd=true;operateId=row.id">重置密码</el-button>
          <el-button type="info" size="mini" @click="$router.push(`edit-user/${row.id}`)">修改</el-button>
          <el-popover v-model="row._visible" placement="top">
            <p>
              你将要删除用户
              <span style="color:red;">{{ row.username }}</span> 确认操作吗?
            </p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="row._visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="delUser(row)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </Table>
    <ResetPsd :show.sync="showResetPsd" :operate-id="operateId" />
  </div>
</template>

<script>
import { getUserList, delUser } from '@/api/user'
import Table from '@/components/Table'
import ResetPsd from './dialog/ResetPsd'

export default {
  components: {
    Table,
    ResetPsd
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
      showResetPsd: false,
      operateId: '',
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
        this.listLoading = false
        this.list = res.data.results
        this.formData.totalPage = res.data.count
        this.listLoading = false
      })
    },
    filterSearch() {
      this.fetchData()
    },
    // 单条删除
    delUser(rot) {
      delUser(rot.id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      })
    },
    handleSizeChange(pageNum) {},
    handleCurrentChange(pageIndex) {}
  }
}
</script>
