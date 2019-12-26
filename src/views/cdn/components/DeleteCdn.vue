<template>
  <el-dialog
    title="批量添加站点"
    :visible.sync="dialogVisible"
    width="30%"
    @close="$emit('update:show', false)"
  >
    <el-form ref="el-form" :model="formData" size="medium" label-width="120px">
      <el-form-item label="分组名称" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="域名和跳转地址" required>
        <el-input v-model="formData.name1" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="格式：www.domain.com http://www.redirect.com, 每行一对域名和跳转地址，空格分隔" />
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
        name: ''
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

