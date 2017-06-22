<template lang='pug'>
#app
  HeaderContainer#header
  Sidebar
  #content
    router-view
</template>

<script>
import Sidebar from './Sidebar'
import HeaderContainer from './HeaderContainer'

export default {
  name: 'app',
  components: { Sidebar, HeaderContainer }
}
</script>

<style lang='scss'>
@import './style.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  color: $fontColor;
  margin-top: $frameTopHeight;
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $frameTopHeight;
  background-color: $backColor;
}
#content {
  position: absolute;
  top: 0;
  left: $frameSideWidthShrink;
  padding: $panelPadding;
}
.expand + #content {
  left: $frameSideWidth;
}
</style>
