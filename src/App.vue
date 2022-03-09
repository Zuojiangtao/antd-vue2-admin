<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import antdLang from 'ant-design-vue/es/locale-provider/zh_CN'

export default {
  name: 'App',
  computed: {
    locale() {
      return antdLang
    },
  },
}
</script>
