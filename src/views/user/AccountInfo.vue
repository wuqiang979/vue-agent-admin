<!--
 * @Author: 尼大人
 * @Date: 2019-12-30 22:03:15
 * @LastEditors  : 尼大人
 * @LastEditTime : 2020-01-05 23:54:11
 -->
<template>
  <div class="app-container">
    <el-card>
      <el-row>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="left-img-box">
            <img src="@/assets/imgs/admin-face.gif" alt="">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <el-form ref="form" :model="userData" :rules="formRules" label-width="100px">
            <el-form-item label="名字">
              <el-input v-model="userData.username" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userData.email" />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="userData.phone" />
            </el-form-item>
            <!-- <el-form-item label="称谓">
              <el-radio-group v-model="sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="过期时间">
              <el-date-picker
                v-model="userData.valid_to_date"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%;"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%;" @click="putUserInfo">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { putUserInfo } from '@/api/user'
export default {
  filters: {

  },
  data() {
    return {
      formRules: {

      }
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  created() {

  },
  methods: {
    ...mapActions(['getInfo']),
    putUserInfo() {
      putUserInfo(this.userData).then(res => {
        this.$message.success(res.message)
        this.$store.commit('user/SET_USERDATA', res.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.left-img-box{
  text-align: center;
  width: 100%;
}
</style>

