<template>
  <div class="hello">
    <h1>{{messpassword}}</h1>
    <form >
      <label for="">手机号</label><input type="text" name="account" v-model="account"> <br>
      <label for="">密码</label><input type="text" name="password" v-model="password"> <br>
      <button @click="login">登录</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        messpassword: '欢迎使用！',
        account: '',
        password: ''
      }
    },
    methods: {
      login() {
        var name = this.account;
        var password = this.password;
        var md5 = require("blueimp-md5");
        this.$http.post('/api/user/login', {
          account: name,
          password: md5(password)
        },{}).then((response) => {
          /* eslint-disable no-console */
          switch (response.body) {
            case 1:
              alert("登录成功");
              window.location.href="http://baidu.com";
              break;
            case -1:
              alert("密码错误");
              break;
            default:
              alert("用户不存在");
              break;
          }
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
.hello {
  background-color: rgb(238, 238, 238);
  color: rgb(255, 192, 163);
  text-align: center;
}
</style>
