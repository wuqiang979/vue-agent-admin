<template>
  <div class="dashboard-editor-container">
    <panel-group />
    <!-- <el-card>
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
        <el-table-column slot="operate" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button type="warning" size="mini" @click="openDialog(0,row.userId)">停用</el-button>
            <el-button type="danger" size="mini" @click="openDialog(1,row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </el-card> -->
  </div>
</template>

<script>
import { getList } from '@/api/table'
import PanelGroup from './components/PanelGroup'
// import Table from '@/components/Table'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
    // Table
  },
  data() {
    return {
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
          label: '集群',
          prop: 'title'
        },
        {
          label: '域名',
          prop: 'author'
        },
        {
          label: '跳转地址',
          prop: 'pageviews'
        },
        {
          label: '所属分组',
          prop: 'status'
        },
        {
          label: '创建时间',
          prop: 'display_time'
        },
        {
          slot: 'operate'
        }
      ]
    }
  },
  created() {
    // getList().then(response => {
    //   this.list = response.data.items.slice(0, 10)
    //   this.formData.totalPage = response.data.items.length
    //   this.listLoading = false
    // })
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
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
