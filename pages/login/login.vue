<style>
  @import "./login.less";
</style>
<template>
  <div>
    <div class="main">
      <div class="login">
        <el-card :bordered="false">
          <div class="title">
            <span>{{login}}</span>
            <p style="font-size: 14px;padding-top: 10px">{{loginTips}}</p>
          </div>
          <div class="form-con">
            <el-form ref="loginForm" :model="form" :rules="rules">
              <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="邮箱地址/手机号码">
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="密码">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="handleSubmit" type="primary" class="login-btn">登录</el-button>
              </el-form-item>
            </el-form>
            <nuxt-link to="/register/register">
              <el-button type="text" class="forget">忘记密码</el-button>
            </nuxt-link>
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>

  export default {

    data(){
      const validateFormat = (rule, value, callback) => {
        let reg = new RegExp('^[a-zA-Z0-9_]{4,16}$');
        if (!reg.test(value)) {
          callback(new Error('Please enter your password'));
        }
        else {
          callback();
        }
      };
      return {
        login: "会员登陆",
        loginTips: "如果您已经是本站会员，请直接登录。",
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validateFormat, message: '密码4-16位数字、字母、下划线', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
      }
    },

  }
</script>

