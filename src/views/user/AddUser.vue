<template>
  <div class="app-container">
    <el-card>
      <el-form ref="formData" size="medium" :model="formData" :rules="formRules" label-width="120px" style="max-width: 500px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formData.password" type="password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="过期时间" prop="valid_to_date">
          <el-date-picker
            v-model="formData.valid_to_date"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:100%;"
            type="datetime"
            placeholder="选择日期时间"
          />
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
import { createUser } from '@/api/user'
export default {
  components: {

  },
  data() {
    return {
      btnLoading: false,
      showAddGroup: false,
      formData: {
        username: '',
        password: '',
        email: '',
        phone: '',
        'valid_to_date': null,
        is_superuser: false,
        is_active: false
      },
      formRules: {
        username: [{ required: true, message: '邮箱不能为空' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        valid_to_date: [{ required: true, message: '到期时间不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {

  },
  methods: {
    onSubmit() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.btnLoading = true
          createUser(this.formData).then(res => {
            this.btnLoading = false
            this.$message.success(res.message)
            this.$router.push('list')
          })
        }
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

