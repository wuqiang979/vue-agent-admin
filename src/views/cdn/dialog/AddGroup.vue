<template>
  <el-dialog
    title="添加分组"
    :visible.sync="dialogVisible"
    width="400px"
    @close="$emit('update:show', false)"
  >
    <el-form ref="el-form" :model="formData" size="medium">
      <el-form-item label="分组名称" required label-width="80px">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGroup } from '@/api/common'
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
        addGroup(this.formData).then(res => {
          this.dialogVisible = false
          this.$message.success(res.message)
          this.$emit('update')
        })
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

