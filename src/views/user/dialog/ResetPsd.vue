<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="500px"
    @close="$emit('update:show', false)"
  >
    <el-form ref="el-form" :model="formData" size="medium">
      <el-form-item label="新密码" required label-width="80px">
        <el-input v-model="formData.formData" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putUserData } from '@/api/user'

export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    operateId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      types: '1',
      formData: {
        new_password: ''
      }
    }
  },
  watch: {
    show(value) {
      this.dialogVisible = value
    }
  },
  created() {

  },
  methods: {
    submitData() {
      putUserData(this.operateId, this.formData).then(res => {
        this.$message.success(res.message)
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.stop-cdn-content{
  text-align: center;
  .tip{
    margin-bottom: 30px;
  }
}
</style>

