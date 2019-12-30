<template>
  <div class="app-container">
    <el-card>
      <el-form ref="formData" size="medium" :model="formData" label-width="80px" style="max-width: 500px;">
        <el-form-item label="分组">
          <el-select v-model="formData.name" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-button icon="el-icon-plus" style="margin-left: 20px;" type="text" @click="showAddGroup=true">新建分组</el-button>
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="跳转到">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.region" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button type="warning" @click="showAddCdns=true">批量添加</el-button>
        </el-form-item>
        <el-form-item>
          <div>温馨提示：批量添加的时候，域名和跳转地址用空格分开；</div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加分组 -->
    <AddGroup :show.sync="showAddGroup" />
    <!-- 批量添加 -->
    <AddCdns :show.sync="showAddCdns" />
  </div>
</template>

<script>
import AddGroup from './dialog/AddGroup.vue'
import AddCdns from './dialog/AddCdns.vue'
export default {
  components: {
    AddGroup,
    AddCdns
  },
  data() {
    return {
      showAddGroup: false,
      showAddCdns: false,
      value2: '',
      formData: {
        page_index: 1,
        page_number: 10,
        totalPage: 0,
        name: '',
        region: false
      }
    }
  },
  created() {
    // getList().then(res => {
    //   this.list = res.data.items.slice(0, 10)
    //   this.formData.totalPage = res.data.items.length
    //   this.listLoading = false
    // })
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

