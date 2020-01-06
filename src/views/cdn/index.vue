<!--
 * @Author: 尼大人
 * @Date: 2020-01-04 00:29:08
 * @LastEditors  : 尼大人
 * @LastEditTime : 2020-01-04 01:48:33
 -->
<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form ref="form" size="small" :model="formData" :inline="true">
          <el-form-item label="关键词">
            <el-input v-model="formData.keyWord" />
          </el-form-item>
          <el-form-item label="分组">
            <el-select v-model="formData.region" placeholder="请选着分组" clearable>
              <el-option v-for="item in groupData" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="filterSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="$router.push('add-cdn')">添加</el-button>
            <el-button icon="el-icon-download" type="success">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-box">
        <el-button size="medium" type="danger" @click="deleteMany">批量删除</el-button>
        <!-- <el-button size="medium" type="warning" @click="showSetGroup=true">设置分组</el-button> -->
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
            <el-switch v-model="row.status" disabled />
          </template>
        </el-table-column>
        <el-table-column slot="operate" label="操作" width="300" align="center">
          <template slot-scope="{ row }">
            <el-button type="success" size="mini" @click="$router.push(`edit-cdn/${row.id}`)">配置</el-button>
            <el-button v-if="row.status" type="warning" size="mini" @click="operateId=row.id;showStopCdn=true">停用</el-button>
            <el-button v-else :loading="btnLoading" type="warning" size="mini" @click="toWork(row.id)">启用</el-button>
            <el-popover
              v-model="row.visible"
              placement="top"
            >
              <p>你将要 删除 站点 <span style="color:red;">123.com</span> 确认操作吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="delCdn(row)">确定</el-button>
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
import { getCdns, putCdnPartIfo, delCdn } from '@/api/cdn'
import { getGroup } from '@/api/common'
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
      btnLoading: false, // 提交操作是按钮的状态
      showStopCdn: false,
      showSetGroup: false,
      visible: false,
      groupData: [], // 分组
      statusType: [{
        label: '启用',
        value: '1'
      }, {
        label: '停用',
        value: '2'
      }],
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
      formData: {
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // offset: 1,
        // limit: 10,
        // totalPage: 0
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
          label: '访问次数',
          prop: 'visit'
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
          slot: 'status'
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
    this.getGroup()
  },
  methods: {
    filterSearch() {
      this.formData.offset = 1
      this.getCdnList()
    },
    // 获取分组
    getGroup() {
      getGroup().then(res => {
        this.groupData = res.data.results
      })
    },
    // 获取cdn加速列表
    getCdnList() {
      getCdns(this.formData).then(res => {
        res.data.results.forEach(item => {
          item.visible = false
        })
        this.list = res.data.results
        this.formData.totalPage = res.data.count
        this.listLoading = false
      })
    },
    // 单条删除
    delCdn(rot) {
      delCdn(rot.id).then(res => {
        this.$message.success('删除成功')
        this.getCdnList()
      })
    },
    // 启用
    toWork(id) {
      this.btnLoading = true
      putCdnPartIfo(id, {
        status: true
      }).then(res => {
        this.btnLoading = false
        this.getCdnList()
      })
    },
    // 批量删除
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

