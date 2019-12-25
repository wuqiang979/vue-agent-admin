<template>
  <section>
    <el-table
      size="small"
      :data="tableData"
      element-loading-text="Loading"
      fit
      highlight-current-row
      stripe
      border
    >
      <template v-for="(item, index) in tableColumns">
        <slot v-if="item.slot" :name="item.slot" />
        <component :is="item.component" v-else-if="item.component" :key="index" :column="item" />
        <el-table-column v-else :key="index" align="center" v-bind="item" />
      </template>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      v-if="isPagination"
      class="page-box"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="totalPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>

<script>

export default {
  name: 'Table',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格列数据
    tableColumns: {
      type: Array,
      default: () => []
    },
    // 是否显示分页组件
    isPagination: {
      type: Boolean,
      default: true
    },
    // 分页
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  created() {

  },
  methods: {
    handleCurrentChange(currentPage) {
      // const $main = document.querySelector('.el-main')
      // $main.scrollTop = 0
      this.$emit('handleCurrentChange', currentPage)
    },
    handleSizeChange(pageSize) {
      // const $main = document.querySelector('.el-main')
      // $main.scrollTop = 0
      this.$emit('handleSizeChange', pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-box{
    margin-top: 20px;
  }
</style>
