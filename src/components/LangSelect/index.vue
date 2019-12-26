<template>
  <el-dropdown trigger="click" class="international right-menu-item" @command="handleSetLanguage">
    <div class="">
      <svg-icon icon-class="language" class="international-icon only-this-one" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
export default {
  methods: {
    language() {
      // return AppModule.language
    },

    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 28px!important;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
    .only-this-one{
      vertical-align: middle;
    }
  }
</style>

