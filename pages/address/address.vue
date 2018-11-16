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
          <h3><strong>收货地址</strong>
            <el-button style="float: right; padding: 8px; height: 30px;" type="primary"
                       round @click="outerVisible = true">添加地址
            </el-button>
          </h3>
          <div class="border"></div>
          <el-card class="address-card">
            <div slot="header">
              <h3>已有收货地址
                <el-button style="float: right; padding: 3px ;width: 30px;height: 30px;" type="danger"
                           icon="el-icon-delete" circle></el-button>
                <el-button style="float: right; padding: 3px ;width: 30px;height: 30px; margin-right: 5px;" type="primary"
                           icon="el-icon-edit" circle @click="outerVisible = true"></el-button>
              </h3>
            </div>
            <div>
              <span><strong>姓名：</strong>{{personName}}</span><br/>
              <span><strong>电话：</strong>{{personPhone}}</span><br/>
              <span><strong>邮箱：</strong>{{personEmail}}</span><br/>
              <span><strong>公司地址：</strong>{{personCompanyAds}}</span><br/>
              <span><strong>家庭地址：</strong>{{personHomeAds}}</span><br/>
            </div>
          </el-card>
          <el-dialog title="修改地址" :visible.sync="outerVisible">
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
          </el-dialog>
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
        personName: '冯世杰',
        personPhone: '18851162269',
        personAddress: '江苏省南京市栖霞区羊山北路1号',
        personEmail: '1300653421',
        personCompanyAds: '江苏省南京市栖霞区羊山北路1号',
        personHomeAds: '江苏省南京市栖霞区羊山北路1号',
        outerVisible: false,
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

  .address-card {

  }

  .el-card__body {
    justify-content: left;
    font-size: 16px;
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
