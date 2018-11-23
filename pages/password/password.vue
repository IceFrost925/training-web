<template>
  <div>
    <Menu :menuItem="menuItem"></Menu>
    <div class="main">
      <div class="el-header">
          <span style="font-size: 16px">
            <nuxt-link to="/">
              <el-button type="text">首页</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/info/info">
              <el-button type="text">会员中心</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/address/address">
              <el-button type="text">收货地址</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/password/password">
              <el-button type="text">修改密码</el-button>
            </nuxt-link>
          </span>
      </div>
      <div class="aside">
        <el-menu>
          <el-menu-item index="1">
            <nuxt-link to="/info/info">
              <el-button type="text" style="color: #000000">会员中心</el-button>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="2">
            <nuxt-link to="/address/address">
              <el-button type="text" style="color: #000000">收货地址</el-button>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="3">
            <nuxt-link to="/password/password">
              <el-button type="text" style="color: #000000">修改密码</el-button>
            </nuxt-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="infoBox">
        <div class="box">
          <h3>
            <strong>修改密码</strong>
          </h3>
          <div class="border"></div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="输入密码" prop="psd1">
              <el-input type="password" v-model="ruleForm.psd1"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="psd2">
              <el-input type="password" v-model="ruleForm.psd2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as infoRequest from '../../assets/info/info'
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer
    },
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.psd1 !== '') {
            this.$refs.ruleForm.validateField('psd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.psd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
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
        name: '',
        phone: '',
        email: '',
        suser: {},
        ruleForm: {
          psd1: '',
          psd2: ''
        },
        rules: {
          psd1: [
            {validator: validatePass, trigger: 'blur'},
            {validator: validateFormat, message: '密码4-16位数字、字母、下划线', trigger: 'blur'}
          ],
          psd2: [
            {validator: validatePass2, trigger: 'blur'},
            {validator: validateFormat, message: '密码4-16位数字、字母、下划线', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            infoRequest.updatePassword(this)
          } else {
            console.log('修改失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
      infoRequest.getUserInfo(this)
    }
  }
</script>

<style>
  .main {
    margin: 0 150px;
    padding: 50px;
    min-height: 500px;
  }

  .el-header {
    padding: 0 20px;
    box-sizing: border-box;
  }

  .infoBox {
    position: absolute;
    top: 370px;
    left: 450px;
  }

  .aside {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
  }

  .border {
    margin-top: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e0dddd;
    height: 10px;
  }

  .box {
    width: 650px;
  }
</style>
