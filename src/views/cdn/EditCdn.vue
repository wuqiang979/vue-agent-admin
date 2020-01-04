<template>
  <div class="app-container">
    <el-card>
      <el-form ref="formData" size="medium" :model="formData" label-width="80px" style="max-width: 500px;">
        <el-form-item label="域名">
          <el-input v-model="formData.match_domain" />
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="formData.group" placeholder="please select your zone">
            <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-button icon="el-icon-plus" style="margin-left: 20px;" type="text" @click="showAddGroup=true">新建分组</el-button>
        </el-form-item>
        <el-form-item label="跳转到">
          <el-input v-model="formData.to_domain" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.status" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="btnLoading" type="primary" @click="onSubmit">保存配置</el-button>
        </el-form-item>
        <el-form-item>
          <div>温馨提示：批量添加的时候，域名和跳转地址用空格分开；</div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加分组 -->
    <AddGroup :show.sync="showAddGroup" />
  </div>
</template>

<script>
import { getCdnDetail, putCdnAllIfo } from '@/api/cdn'
import { getGroup } from '@/api/common'
import AddGroup from './dialog/AddGroup.vue'
export default {
  components: {
    AddGroup
  },
  data() {
    return {
      btnLoading: false,
      showAddGroup: false,
      formData: {
        match_domain: '',
        group: 10,
        to_domain: 0,
        status: ''
      },
      groupList: []
    }
  },
  created() {
    this.getDetail()
    this.getGroup()
  },
  methods: {

    // 获取分组列表
    getGroup() {
      getGroup().then(res => {
        this.groupList = res.data.results
      })
    },
    // 获取cdn详情
    getDetail() {
      getCdnDetail(this.$route.params.id).then(res => {
        this.formData = Object.assign({}, this.formData, res.data)
      })
    },
    onSubmit() {
      this.btnLoading = true
      putCdnAllIfo(this.formData).then(res => {
        this.$message.success('修改成功！')
        this.btnLoading = false
        this.getDetail()
      })
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

