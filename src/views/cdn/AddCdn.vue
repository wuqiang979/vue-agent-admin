<template>
  <div class="app-container">
    <el-card>
      <el-form ref="form" size="medium" :model="form" label-width="80px" style="max-width: 500px;">
        <el-form-item label="分组">
          <el-select v-model="form.name" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-button icon="el-icon-plus" style="margin-left: 20px;" type="text">新建分组</el-button>
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="跳转到">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.region" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button type="primary" @click="onSubmit">批量添加</el-button>
        </el-form-item>
        <el-form-item>
          <div>温馨提示：批量添加的时候，域名和跳转地址用空格分开；</div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  components: {},
  data() {
    return {
      value2: '',
      form: {
        name: '',
        region: false,
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
          label: '状态',
          prop: 'display_time'
        },
        {
          slot: 'operate'
        }
      ]
    }
  },
  created() {
    getList().then(res => {
      this.list = res.data.items.slice(0, 10)
      this.formData.totalPage = res.data.items.length
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
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  margin-bottom: 20px;
  @include flex(flex-end);
}
</style>

