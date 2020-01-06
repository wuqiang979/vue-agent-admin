<template>
  <el-dialog
    title="批量添加站点"
    :visible.sync="dialogVisible"
    width="500px"
    @close="$emit('update:show', false)"
  >
    <el-form
      ref="elForm"
      :model="formData"
      :rules="formRules"
      size="medium"
      label-width="120px"
    >
      <el-form-item label="分组名称" prop="group">
        <el-select
          v-model="formData.group"
          style="width: 100%"
          placeholder="请选择分组"
        >
          <el-option v-for="item in group" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="域名和跳转地址" prop="domains">
        <el-input v-model="formData.domains" type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="格式：www.domain.com http://www.redirect.com, 每行一对域名和跳转地址，空格分隔" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitData">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getGroup } from '@/api/common'
import { addCdns } from '@/api/cdn'

export default {
  components: {

  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      showAddGroup: false,
      group: [],
      formData: {
        group: '',
        domains: ''
      },
      formRules: {
        group: [{ required: true, message: '请选择分组', trigger: 'change' }],
        domains: [{ required: true, message: '请选择分组', trigger: 'blur' }]
      }
    }
  },
  watch: {
    show(value) {
      this.dialogVisible = value
    }
  },
  created() {
    this.getGroup()
  },
  methods: {
    getGroup() {
      getGroup().then(res => {
        this.group = res.data.results
      })
    },
    submitData() {
      this.$refs['elForm'].validate(valid => {
        if (valid) {
          const submitData = {
            group: this.formData.group,
            domains: []
          }
          const arrData = this.formData.domains.split(/\n/)
          let flagLength = 0
          arrData.forEach(item => {
            const itemSplitArr = item.split(/\s/)
            submitData.domains.push({
              match_domain: itemSplitArr[0],
              to_domain: itemSplitArr[1]
            })
            if (itemSplitArr[0] && itemSplitArr[1]) {
              flagLength++
            }
          })
          if (flagLength === arrData.length) {
            addCdns(submitData).then(res => {
              this.dialogVisible = false
              this.$message.success(res.message)
              this.$router.push('site')
            })
          } else {
            this.$message.warning('请按要求输入域名和跳转地址')
          }
        } else {
          this.$message.warning('请填写必要信息')
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

