<template>
  <div class="app-container">
    <el-card>
      <el-form
        ref="formData"
        size="medium"
        :model="formData"
        label-width="80px"
        style="max-width: 500px;"
      >
        <el-form-item label="分组">
          <el-row>
            <el-col :xs="24" :sm="18">
              <el-select
                v-model="formData.group"
                style="width: 100%"
                placeholder="请选择分组"
              >
                <el-option v-for="item in group" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-col>
            <el-col :xs="24" :sm="6">
              <el-button
                icon="el-icon-plus"
                style="margin-left: 20px;"
                type="text"
                @click="showAddGroup = true"
              >新建分组</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="formData.match_domain" />
        </el-form-item>
        <el-form-item label="跳转到">
          <el-input v-model="formData.to_domain" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="formData.to_index" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button
            type="warning"
            @click="showAddCdns = true"
          >批量添加</el-button>
        </el-form-item>
        <el-form-item>
          <div>温馨提示：批量添加的时候，域名和跳转地址用空格分开；</div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加分组 -->
    <AddGroup :show.sync="showAddGroup" />
    <!-- 批量添加 -->
    <AddCdns :show.sync="showAddCdns" />
  </div>
</template>

<script>
import { addCdn } from '@/api/cdn'
import { getGroup } from '@/api/common'
import AddGroup from './dialog/AddGroup.vue'
import AddCdns from './dialog/AddCdns.vue'
export default {
  components: {
    AddGroup,
    AddCdns
  },
  data() {
    return {
      showAddGroup: false,
      showAddCdns: false,
      group: [],
      formData: {
        match_domain: '',
        to_domain: '',
        status: false,
        group: '',
        remark: 'test'
      }
    }
  },
  created() {
    getGroup().then(res => {
      this.group = res.data.results
    })
  },
  methods: {
    onSubmit() {
      addCdn(this.formData).then(res => {
        this.$message.success(res.message)
        this.$router.push('site')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
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
