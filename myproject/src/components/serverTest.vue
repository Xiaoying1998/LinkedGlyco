<template>

  <div>
    <img src="../assets/logo.png">
    <p>{{ msg }}</p>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    name: 'serverTest',
    data(){
      return {
        msg: "",
      }
    },
    methods: {
      getMessage(){
        const path = 'http://localhost:5000/ping';
        axios.get(path).then((res) => {
          this.msg = res.data;
          console.log(typeof (this.msg));
        }).catch(error => {
          console.error(error);
        });
      }
    },
    created () {
      this.getMessage();
    }
  }
</script>

<style scoped>

</style>
