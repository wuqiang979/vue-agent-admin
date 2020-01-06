<template>
  <div class="app-container">
    <el-card>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="12" :md="10" :lg="10">
          <el-form
            ref="form"
            :model="formData"
            :rules="formRules"
            label-width="100px"
            style="max-width: 700px;"
          >
            <el-form-item label="原密码" prop="current_password">
              <el-input v-model="formData.current_password" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
              <el-input v-model="formData.new_password" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="re_new_password">
              <el-input v-model="formData.re_new_password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" @click="submit">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { modifyPsd } from '@/api/user'

export default {
  filters: {},
  data() {
    const newPsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('新密码不能为空'))
      } else {
        if (this.formData.re_new_password && this.formData.re_new_password !== this.formData.new_password) {
          callback(new Error('新密码和确认密码不一致'))
          this.formData.new_password = ''
        } else {
          callback()
        }
      }
    }
    const reNewPsd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      } else {
        if (this.formData.new_password && this.formData.re_new_password !== this.formData.new_password) {
          callback(new Error('新密码和确认密码不一致'))
          this.formData.re_new_password = ''
        } else {
          callback()
        }
      }
    }
    return {
      sex: 1,
      formData: {
        current_password: '',
        new_password: '',
        re_new_password: ''
      },
      formRules: {
        current_password: [{ required: true, message: '原始密码不能为空', trigger: 'blur' }],
        new_password: [{ required: true, validator: newPsd, trigger: 'blur' }],
        re_new_password: [{ required: true, validator: reNewPsd, trigger: 'blur' }]
      }
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          modifyPsd(this.formData).then(res => {
            this.$message.success(res.message)
          })
        } else {
          this.$message.warning('请填写必要信息')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left-img-box {
  text-align: center;
  width: 100%;
}
</style>
