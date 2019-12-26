<template>
  <div>
    <el-dialog
      title="设置分组"
      :visible.sync="dialogVisible"
      width="40%"
      @close="$emit('update:show', false)"
    >
      <el-form ref="el-form" :model="formData" size="medium" :inline="true">
        <el-form-item label="分组名称" required label-width="100px">
          <el-select v-model="value" style="width:300px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-seletion>
            </el-option></el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="showAddGroup=true">+ 新建分组</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitData">确 定</el-button>
      </span>
    </el-dialog>
    <AddGroup :show.sync="showAddGroup" />
  </div>
</template>

<script>
import AddGroup from './AddGroup.vue'
export default {
  components: {
    AddGroup
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
      formData: {
        name: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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

