<template>
  <el-upload
    class="upload-demo"
    :action="uploadUrl"
    :on-change="handleChange"
    :on-success="handleSuccess"
    :file-list="fileList"
  >
    <el-button size="mini" type="primary">点击上传</el-button></div>
  </el-upload>
</template>

<script>

export default {
  name: 'UploadImg',
  props: {
    // 表格数据
    imageUrl: {
      type: String,
      default: ''
    },
    // 表格数据
    objKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: process.env.VUE_APP_UPLOAD_API,
      fileList: []
    }
  },
  created() {

  },
  methods: {
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-1)
    },
    beforeUpload(pageSize) {
      // this.$emit('handlePageSizeChange', '')
    },
    handleSuccess(res, file, fileList) {
      this.fileList = [file]
      if (res.status * 1 !== 0) {
        this.$message.warning(res.msg)
      } else {
        this.$emit('handleSuccess', this.objKey, res.data[0].path)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
