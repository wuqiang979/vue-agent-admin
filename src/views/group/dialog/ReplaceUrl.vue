<template>
  <el-dialog
    title="批量替换源信息"
    :visible.sync="dialogVisible"
    width="500px"
    @close="$emit('update:show', false)"
  >
    <el-form ref="elForm" :model="formData" :rules="formRules" size="medium" label-width="100px">
      <el-form-item label="旧跳转地址" prop="old_url">
        <el-input v-model="formData.old_url" placeholder="旧跳转地址不能为空" />
      </el-form-item>
      <el-form-item label="新跳转地址" prop="new_url">
        <el-input v-model="formData.new_url" placeholder="新跳转地址不能为空" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { replaceGroupUrl } from '@/api/common'
export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    opereateData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      formData: {
        group: '',
        old_url: '',
        new_url: ''
      },
      formRules: {
        old_url: [
          { required: true, message: '请输入旧跳转地址', trigger: 'blur' }
        ],
        new_url: [
          { required: true, message: '请输入新跳转地址', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    show(value) {
      this.dialogVisible = value
      if (value) {
        this.formData.group = this.opereateData.id
      }
    }
  },
  created() {

  },
  methods: {
    submitData() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          replaceGroupUrl(this.formData).then(res => {
            this.$message.success(res.message)
            this.dialogVisible = false
          })
        } else {
          this.$message.warning('请补全必要信息')
        }
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

