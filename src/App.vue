<template lang='pug'>
#app
  img.vue(src='./assets/logo.png')
  router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
* { margin: 0; padding: 0 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  img.vue{
    width: 80px;
    height: auto;
  }
}
</style>
