<template>
  <el-dialog
    title="批量替换源信息"
    :visible.sync="dialogVisible"
    width="500px"
    @close="$emit('update:show', false)"
  >
    <el-form ref="el-form" :model="formData" size="medium" label-width="100px">
      <el-form-item label="旧跳转地址" required>
        <el-input v-model="formData.oldUrl" placeholder="旧跳转地址不能为空" />
      </el-form-item>
      <el-form-item label="新跳转地址" required>
        <el-input v-model="formData.newUrl" placeholder="新跳转地址不能为空" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      formData: {
        oldUrl: '',
        newUrl: ''
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
      if (this.formData.name) {
        this.dialogVisible = false
      } else {
        this.$message.warning('请输入分组名称')
      }
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

