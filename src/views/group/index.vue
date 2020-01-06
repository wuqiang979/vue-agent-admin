<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="formData" size="small" :model="formData" :inline="true">
          <el-form-item label="名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <!-- <el-form-item label="类型">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="filterSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="showAddGroup=true">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Table
        :table-data="list"
        :table-columns="tableColumns"
        :current-page="formData.offset"
        :page-size="formData.limit"
        :total-page="formData.totalPage"
      >
        <el-table-column slot="operate" label="操作" width="400" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="$router.push(`/cdn/site`)">查看转发</el-button>
            <el-button type="warning" size="mini" @click="showReplaceUrl=true;opereateData=row">替换跳转地址</el-button>
            <el-button type="success" size="mini" @click="showModifyName=true;opereateData=row">修改</el-button>
            <!-- <el-button type="text" size="mini">删除</el-button> -->
            <el-popover
              v-model="row._visible"
              placement="top"
            >
              <p>你将要 删除 分组 <span style="color:red;">[{{ row.id }}] </span>确认操作吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="row._visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="delGroup(row)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </Table>
    </el-card>
    <ReplaceUrl :show.sync="showReplaceUrl" :opereate-data="opereateData" />
    <ModifyName :show.sync="showModifyName" :opereate-data="opereateData" @update="getGroup" />
    <AddGroup :show.sync="showAddGroup" @update="getGroup" />
  </div>
</template>

<script>
import { getGroup, delGroup } from '@/api/common'
import Table from '@/components/Table'
import AddGroup from './dialog/AddGroup'
import ReplaceUrl from './dialog/ReplaceUrl'
import ModifyName from './dialog/ModifyName'
export default {
  components: {
    Table,
    AddGroup,
    ReplaceUrl,
    ModifyName
  },
  data() {
    return {
      showReplaceUrl: false,
      showModifyName: false,
      showAddGroup: false,
      visible: false,
      opereateData: {}, // 当前操作的分组对象
      formData: {
        name: '',
        offset: 1,
        limit: 10,
        totalPage: 0
      },
      list: [],
      tableColumns: [
        {
          label: 'ID',
          prop: 'id',
          width: '95'
        },
        {
          label: '分组名称',
          prop: 'name'
        },
        {
          label: '关联的跳转域名数量',
          prop: 'name'
        },
        {
          label: '创建时间',
          prop: 'created'
        },
        {
          slot: 'operate'
        }
      ]
    }
  },
  created() {
    this.getGroup()
  },
  methods: {
    filterSearch() {
      this.formData.offset = 1
      this.getGroup()
    },
    getGroup() {
      getGroup().then(res => {
        res.data.results.forEach(item => {
          item._visible = false
        })
        this.list = res.data.results
        this.formData.totalPage = res.data.count
        this.listLoading = false
      })
    },
    addGroup() {
      // this.
    },
    delGroup(obj) {
      delGroup(obj.id).then(res => {
        this.$message.success(res.message)
        obj._visible = false
        this.getGroup()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  margin-bottom: 20px;
  @include flex(flex-end);
}
.operate-box {
  margin-bottom: 20px;
}
</style>

