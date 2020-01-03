<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="form" size="small" :model="form" :inline="true">
          <el-form-item label="集群">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="域名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="跳转地址">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="分组">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="迁移状态">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="$router.push('add-cdn')">添加</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-box">
        <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
        <el-button size="medium" type="warning" @click="showSetGroup=true">设置分组</el-button>
      </div>
      <Table
        :table-data="list"
        :table-columns="tableColumns"
        :current-page="formData.page_index"
        :page-size="formData.page_number"
        :total-page="formData.totalPage"
      >
        <el-table-column slot="operate" label="状态" align="center">
          <template slot-scope="{ row }">
            <el-switch v-model="row.to_index" disabled />
          </template>
        </el-table-column>
        <el-table-column slot="operate" label="操作" width="300" align="center">
          <template slot-scope="{ row }">
            <el-button type="success" size="mini" @click="$router.push('edit-cdn/1')">配置</el-button>
            <el-button type="warning" size="mini" @click="operateId=row.id;showStopCdn=true">停用</el-button>
            <el-popover
              v-model="visible"
              placement="top"
            >
              <p>你将要 删除 站点 <span style="color:red;">123.com</span> 确认操作吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </Table>
    </el-card>
    <StopCdn :id="operateId" :show.sync="showStopCdn" @update="getCdnList" />
    <SetGroup :show.sync="showSetGroup" />
  </div>
</template>

<script>
import { getCdns } from '@/api/cdn'
import Table from '@/components/Table'
import StopCdn from './dialog/StopCdn'
import SetGroup from './dialog/SetGroup'
export default {
  components: {
    Table,
    StopCdn,
    SetGroup
  },
  data() {
    return {
      showStopCdn: false,
      showSetGroup: false,
      visible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formData: {
        page_index: 1,
        page_number: 10,
        totalPage: 0
      },
      list: [],
      tableColumns: [
        {
          type: 'selection',
          width: '95'
        },
        // {
        //   label: '集群',
        //   prop: 'group_name'
        // },
        {
          label: '域名',
          prop: 'match_domain'
        },
        {
          label: '跳转地址',
          prop: 'to_domain'
        },
        {
          label: '所属分组',
          prop: 'group_name'
        },
        {
          label: '创建时间',
          prop: 'updated'
        },
        {
          // label: '状态',
          // prop: 'to_index'
          slot: 'to_index'
        },
        {
          slot: 'operate'
        }
      ],
      operateId: '' // 当前操作的cdn ID
    }
  },
  created() {
    this.getCdnList()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // 获取cdn加速列表
    getCdnList() {
      getCdns(this.formData).then(res => {
        this.list = res.data.results
        this.formData.totalPage = res.data.count
        this.listLoading = false
      })
    },
    deleteMany() {
      this.$confirm('你将要批量删除选中的内容，操作不可恢复确认吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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

