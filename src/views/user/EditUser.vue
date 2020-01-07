<template>
  <div class="app-container">
    <el-card>
      <el-form ref="formData" size="medium" :model="formData" label-width="120px" style="max-width: 500px;">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" />
        </el-form-item>
        <!-- <el-form-item label="登录密码">
          <el-input v-model="formData.password" />
        </el-form-item> -->
        <el-form-item label="手机号">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="超级用户状态">
          <el-switch v-model="formData.is_superuser" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-switch v-model="formData.is_active" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="btnLoading" type="primary" @click="onSubmit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserData, putUserData } from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      btnLoading: false,
      showAddGroup: false,
      formData: {
        email: '',
        username: 10,
        phone: 0,
        is_superuser: '',
        is_active: ''
      },
      groupList: []
    }
  },
  created() {
    this.getDetail()
  },
  methods: {

    // 获取用户详情
    getDetail() {
      getUserData(this.$route.params.userId).then(res => {
        this.formData = Object.assign({}, this.formData, res.data)
      })
    },
    onSubmit() {
      this.btnLoading = true
      putUserData(this.formData).then(res => {
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

