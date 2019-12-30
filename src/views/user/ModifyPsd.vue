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
            <el-form-item label="手机号码">
              <el-input v-model="formData.phone" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input disabled />
            </el-form-item>
            <el-form-item label="原密码">
              <el-input type="password" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  filters: {},
  data() {
    return {
      sex: 1,
      formData: {
        phone: '',
        username: '',
        email: ''
      },
      formRules: {

      }
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.left-img-box {
  text-align: center;
  width: 100%;
}
</style>
