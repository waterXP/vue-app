<template lang='pug'>
Form-item.datepicker(prop='prop')
  .ivu-input-wrapper.ivu-input-type.ivu-input-group.ivu-input-group-with-prepend
    .ivu-input-group-prepend
      i.ivu-icon.ivu-icon-calendar
    Date-picker(
      type='datetimerange'
      placeholder='选择日期和时间'
      @input='handleInput'
      :value='currentValue'
      format="yyyy-MM-dd HH:mm"
      :clearable='false'
    )
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
      this.currentValue = val
    }
  }
}
</script>
<style lang='scss'>
.datepicker {
  .ivu-date-picker-editor .ivu-icon {
    display: none;
  }
  .ivu-input {
    width: 219px;
    padding-right: 7px;
  }
}
</style>
