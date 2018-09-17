<template>
  <div>
     <div @click='dd1'>{{name}}</div>
  </div>

</template>

<script>
import DEMp from '../doc/1.md';
export default {
  data() {
    return {
      name:4
    }
  },
  methods:{
    dd1(){
      alert(2)
    }
  },
  mounted() {
    console.log(this);
  },
  components:{
    DEMp
  }
}
</script>

<style lang="scss">
</style>
