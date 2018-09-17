<template>
  <div id="app">
      <div>
        <router-link to='/'>主页</router-link>
         <router-link to='/home'>卡片</router-link>
      </div>
    <div>
         <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components:{
  }
}
</script>

<style lang="scss">
</style>
