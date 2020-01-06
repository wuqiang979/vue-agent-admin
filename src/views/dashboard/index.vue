<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  created() {
    if (this.userData.is_superuser) {
      this.currentRole = adminDashboard
    } else {
      this.currentRole = editorDashboard
    }
  }
}
</script>
