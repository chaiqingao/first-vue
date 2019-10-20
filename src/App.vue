<template>
  <div class="hello">
    <h1>{{message}}</h1>
    <form >
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        message: '欢迎使用！',
        userName: '',
        age: ''
      }
    },
    methods: {
      addUser() {
        var name = this.userName;
        var age = this.age;
        this.$http.post('/api/user/addUser', {
          userName: name,
          age: age
        },{}).then((response) => {
          /* eslint-disable no-console */
          console.log(response);
        })
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
