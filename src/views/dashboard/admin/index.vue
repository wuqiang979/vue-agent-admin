<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <el-card>
      <div slot="header">
        <span>{{ $t("home.title") }}</span>
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
            <el-button type="info" size="mini" @click="$router.push(`/user/edit-user/${row.id}`)">修改</el-button>
            <el-popover v-model="row._visible" placement="top">
              <p>
                你将要删除用户
                <span style="color:red;">{{ row.username }}</span>确认操作吗?
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
    </el-card>
  </div>
</template>

<script>
import { getUserList, delUser } from '@/api/user'
import PanelGroup from './components/PanelGroup'
import Table from '@/components/Table'
import ResetPsd from '@/views/user/dialog/ResetPsd'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    Table,
    ResetPsd
  },
  data() {
    return {
      showResetPsd: false,
      operateId: '',
      list: [],
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
    getUserList().then(res => {
      this.list = res.data.results
      this.formData.totalPage = res.data.count
      this.listLoading = false
    })
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    // 单条删除
    delUser(rot) {
      delUser(rot.id).then(res => {
        this.$message.success('删除成功')
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
