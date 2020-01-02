<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="form" size="small" :model="form" :inline="true">
          <el-form-item label="名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <!-- <el-form-item label="类型">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
            <el-button type="warning" size="mini" @click="showStopCdn=true">替换跳转地址</el-button>
            <el-button type="success" size="mini">修改</el-button>
            <!-- <el-button type="text" size="mini">删除</el-button> -->
            <el-popover
              v-model="visible"
              placement="top"
              width="260"
            >
              <p>你将要 删除 分组 [{{ row.id }}] 确认操作吗?</p>
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
  </div>
</template>

<script>
import { getGroup } from '@/api/common'
import Table from '@/components/Table'
export default {
  components: {
    Table
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
    getGroup().then(res => {
      this.list = res.data.results
      this.formData.totalPage = res.data.count
      this.listLoading = false
    })
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

