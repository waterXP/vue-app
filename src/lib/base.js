import config from '@/config'

export default {
  install (Vue, options) {
    Vue.prototype.alert = function (type, msg) {
      if (!msg) {
        return this.$emit('alerts', type)
      }
      this.$emit('alerts', msg, type)
    }
    Vue.prototype.config = config
  }
}
