<template lang='pug'>
Form-item(prop='prop')
  Input(
    type='text'
    :value='currentValue'
    @input='handleInput'
    placeholder='关键字'
  )
    Icon(type='qr-scanner', slot='prepend')
</template>
<script>
export default {
  name: 'test',
  props: ['prop', 'value'],
  data: function () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
      this.setCurrentValue(value)
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
    }
  },
  watch: {
    value (val) {
      this.setCurrentValue(val)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
