<template>
  <div>
    <Menu :menuItem="menuItem"></Menu>
    <div class="main">
      <div class="register">
        <el-card :bordered="false">
          <div class="title">
            <span>欢迎注册</span>
          </div>
          <el-form ref="registerForm" :model="formReg" :rules="rules">
            <el-form-item prop="email">
              <el-input type="email" v-model="formReg.email" placeholder="请输入注册邮箱">
              </el-input>
            </el-form-item>
            <el-form-item prop="password1">
              <el-input type="password" v-model="formReg.password1" placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item prop="password2">
              <el-input type="password" v-model="formReg.password2" placeholder="请确认密码">
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="handleRegister" type="danger" class="register-btn">注册</el-button>
            </el-form-item>
          </el-form>
          <nuxt-link to="/login/login">
            <el-button type="text" class="turn-login">已有账号？点我登陆</el-button>
          </nuxt-link>
        </el-card>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer
    },
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
        menuItem: 'index',
        formReg: {
          email: '',
          password1: '',
          password2: '',
        },
        rules: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'}
          ],
          password1: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validateFormat, message: '密码4-16位数字、字母、下划线', trigger: 'blur'}
          ],
          password2: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: validateFormat, message: '密码4-16位数字、字母、下划线', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleRegister(){
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            if (this.formReg.password1 == this.formReg.password2) {
              loginRequest.getRegister(this)
            } else {
              this.$message.error("密码不一致")
            }
          }
        })
      }
    },

  }
</script>

<style>
  .register {
    position: absolute;
    right: 300px;
    top: 20%;
    width: 350px;
  }

  .title {
    text-align: center;
    font-weight: 700;
    padding-bottom: 30px;
    font-size: 18px;
  }

  .register-btn {
    width: 100%;
  }

  .turn-login {
    margin-left: 180px;
  }
</style>
