<template>
  <main class="main">
    <AppTopNavbar/>
    <nuxt/>
    <AppFooter/>
  </main>
</template>

<script>
import AppFooter from '@/components/AppFooter'
import AppTopNavbar from '@/components/AppTopNavbar'

export default {
  components: {
    AppFooter,
    AppTopNavbar
  }
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>

