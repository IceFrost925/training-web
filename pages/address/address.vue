<template>
  <div>
    <Menu></Menu>
    <div class="container">
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
            <nuxt-link to="/password/password">
              <el-button type="text">修改密码</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/address/address">
              <el-button type="text">收货地址</el-button>
            </nuxt-link>
          </span>
      </div>
      <div class="content">
        <div class="left-coon">
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
        <div class="right-coon">
          <div>
            <h3><strong>收货地址</strong>
              <el-button style="float: right; padding: 8px; height: 30px;" type="primary"
                         round @click="$addAddress">添加地址
              </el-button>
            </h3>
            <div class="border"></div>

            <el-card class="address-card" v-for="(item,index) in addressList" :key="index">
              <div slot="header">
                <h3>已有收货地址{{index + 1}}
                  <el-button style="float: right; padding: 3px ;width: 30px;height: 30px;" type="danger"
                             icon="el-icon-delete" circle @click="$deleteAddress(item)"></el-button>
                  <el-button style="float: right; padding: 3px ;width: 30px;height: 30px; margin-right: 5px;" type="primary"
                             icon="el-icon-edit" circle @click="$updateAddress(item)"></el-button>
                </h3>
              </div>
              <div style="width: 100%">
                <div style="text-align: right" v-if="item.flag">默认地址 <i class="el-icon-circle-check"></i></div>
                <span><strong>姓名：</strong>{{item.name}}</span><br/>
                <span><strong>电话：</strong>{{item.tell}}</span><br/>
                <span><strong>邮箱：</strong>{{item.email}}</span><br/>
                <span><strong>公司地址：</strong>{{item.company}}</span><br/>
                <span><strong>家庭地址：</strong>{{item.content}}</span><br/>
                <div style="text-align: right" v-if="!item.flag"><el-button @click="$defaultAddress(item)">设为默认地址</el-button></div>
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
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as addressRequest from '../../assets/address/address'
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer
    },
    data(){
      return {
        addressList:[],
        selectType: '',
        rowItem:{},
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
            if(this.selectType === 'insert'){
              addressRequest.insertAddress(this)
            }else if(this.selectType === 'update'){
              addressRequest.updateAddress(this)
            }
            this.outerVisible = false
          } else {
            this.$message.error("必填项不能为空")
            return false;
          }
        });

      },
      resetForm(formName) {
        this.ruleForm = {
          name: '',
            phone: '',
            email: '',
            companyAds: '',
            homeAds: ''
        }
      },
      $defaultAddress(item){
        addressRequest.updateDefaultAddress(this,item)
      },
      $addAddress(){
        this.selectType = 'insert'
        this.ruleForm = {
          name: '',
          phone: '',
          email: '',
          companyAds: '',
          homeAds: ''
        }
        this.outerVisible = true
      },
      $updateAddress(item){
        this.selectType = 'update'
        this.rowItem = item
        this.ruleForm = {
          name: item.name,
          phone: item.tell,
          email: item.email,
          companyAds: item.company,
          homeAds: item.content
        }
        this.outerVisible = true
      },
      $deleteAddress(item){
        addressRequest.deleteAddress(this,item)
      }
    },
    created(){
      addressRequest.getAllAddress(this)
    }
  }
</script>

<style>
  .container {
    padding: 50px 190px;
    min-height: 500px;
  }

  .content{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .el-header {
    padding: 0 20px;
    box-sizing: border-box;
  }
  .left-coon {
    display: inline-block;
    width: 250px;
  }

  .right-coon {
    width: 100%;
    padding-left: 30px;
    display: inline-block;
  }

  .address-card{
    margin-top: 20px;
  }

  .el-card__body {
    justify-content: left;
    font-size: 16px;
  }

  .border {
    margin-top: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e0dddd;
    height: 10px;
  }

</style>
