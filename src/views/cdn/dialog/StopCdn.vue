<template>
  <el-dialog
    title="暂停加速"
    :visible.sync="dialogVisible"
    width="600px"
    @close="$emit('update:show', false)"
  >
    <div class="stop-cdn-content">
      <p class="tip">请选择暂停服务的原因</p>
      <el-radio-group v-model="types" size="medium">
        <el-radio-button label="1">违规信息</el-radio-button>
        <el-radio-button label="2">服务到期</el-radio-button>
        <el-radio-button label="3">黑名单</el-radio-button>
        <el-radio-button label="4">其他</el-radio-button>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putCdnPartIfo } from '@/api/cdn'

export default {
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      types: '1'
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
      putCdnPartIfo(this.id, {
        status: false,
        stop_reason: 'types'
      }).then(res => {
        this.dialogVisible = false
        this.$emit('update')
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

