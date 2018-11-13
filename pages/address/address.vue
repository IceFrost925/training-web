<template>
  <div>
    <Menu :menuItem="menuItem"></Menu>
    <div class="main">
      <div class="el-header">
          <span style="font-size: 16px">
            <nuxt-link to="/home/home">
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
          </span>
      </div>
      <div class="aside">
        <el-menu>
          <el-menu-item index="1">
            <nuxt-link to="/info/info">
              <el-button type="text" style="color: #000000">个人信息</el-button>
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
            <strong>收货地址</strong>
          </h3>
          <div class="border"></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="公司地址:" prop="companyAds">
              <el-input v-model="ruleForm.companyAds"></el-input>
            </el-form-item>
            <el-form-item label="家庭地址:" prop="homeAds">
              <el-input v-model="ruleForm.homeAds"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer
    },
    data(){
      return {
        menuItem: 'index',
        ruleForm: {
          name: '',
          phone: '',
          email: '',
          companyAds: '',
          homeAds: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入收货人姓名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入收货人手机号码', trigger: 'blur'},
            {min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur'}
          ],
          homeAds: [
            {required: true, message: '请输入收货地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('提交成功!');
          } else {
            console.log('提交失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

  }
</script>

<style>
  .main {
    margin: 0 150px;
    padding: 50px;
    min-height: 580px;
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
