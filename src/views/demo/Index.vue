<template>
  <div>
    <a-input style="width: 300px" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'KeepAliveDemo',
  computed: {
    ...mapGetters(['keepAlive']),
  },
  activated() {
    console.log(
      '%c KeepAliveDemo已被keep, 触发activated钩子函数>>',
      'background: #1890ff; color: #fff; padding: 4px 2px',
    )
    console.info('kepAlive::', this.keepAlive)
  },
}
</script>
