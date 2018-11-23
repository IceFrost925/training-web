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
            <nuxt-link to="/address/address">
              <el-button type="text">收货地址</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/password/password">
              <el-button type="text">修改密码</el-button>
            </nuxt-link>
              <span>/</span>
            <nuxt-link to="/info/info">
              <el-button type="text">会员中心</el-button>
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
            <strong>会员中心</strong>
          </h3>
          <div class="border"></div>
          <div class="info-wapper">
            <div class="infoItem">
              <label class="pull-left">昵称</label>
              <div class="pull-leftt">
                {{name}}
                <el-button class="btn-edit" type="text" @click="outerVisible = true">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
              </div>
            </div>
            <div class="infoItem">
              <label class="pull-left">邮箱</label>
              <div class="pull-leftt">
                {{email}}
                <el-button class="btn-edit" type="text" @click="outerVisible1 = true">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
              </div>
            </div>
            <div class="infoItem">
              <label class="pull-left">联系电话</label>
              <div class="pull-leftt">
                {{phone}}
                <el-button class="btn-edit" type="text" @click="outerVisible2 = true">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="修改昵称" :visible.sync="outerVisible">
        <div slot="footer" class="dialog-footer">
          <el-input v-model="name" placeholder="请输入内容" style="padding: 0px 10px 50px 10px;"></el-input>
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="$rewrite">修改</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改邮箱" :visible.sync="outerVisible1">
        <div slot="footer" class="dialog-footer">
          <el-input v-model="email" placeholder="请输入内容" style="padding: 0px 10px 50px 10px;"></el-input>
          <el-button @click="outerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="$rewrite">修改</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改电话" :visible.sync="outerVisible2">
        <div slot="footer" class="dialog-footer">
          <el-input v-model="phone" placeholder="请输入内容" style="padding: 0px 10px 50px 10px;"></el-input>
          <el-button @click="outerVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="$rewrite">修改</el-button>
        </div>
      </el-dialog>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import * as InfoRequest from '../../assets/info/info'
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'

  export default {
    components: {
      Menu,
      Footer
    },
    data() {
      return {
        menuItem: 'index',
        outerVisible: false,
        outerVisible1: false,
        outerVisible2: false,
        name: '',
        phone: '',
        email: '',
        password: '',
        suser: {}
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      $rewrite() {
        InfoRequest.updateUserInfo(this)
      }
    },
    created() {
      InfoRequest.getUserInfo(this)
    }
  }
</script>

<style>
  .main {
    margin: 0 150px;
    padding: 50px;
    min-height: 580px;
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

  .info-wapper {
    margin: 20px auto 20px 20px;
  }

  .infoItem {
    height: 70px;
    padding-bottom: 30px;
  }

  label {
    margin-left: 0!important;
    width: 100px;
    line-height: 20px;
    padding: 20px 0;
    text-align: center;
    background-color: #f3f5f7;
    color: #07111b;
    font-weight: 700;
  }

  .pull-leftt {
    width: 600px;
    margin-left: 8px;
    line-height: 20px;
    padding: 20px 0 20px 22px;
    border-bottom: 1px solid #d9dde1;
  }

  .btn-edit {
    float: right;
    font-size: 16px;
    margin-left: 100px;
    padding: 0 0;
  }

  .pull-left {
    float: left;
  }

  /*.avatar-up{*/
  /*border-radius:100%;*/
  /*position:absolute;*/
  /*left:100px;*/
  /*top:100px;*/
  /*}*/
  /*.avatar-uploader .el-upload {*/
  /*border: 1px dashed #d9d9d9;*/
  /*border-radius: 6px;*/
  /*cursor: pointer;*/
  /*position: relative;*/
  /*overflow: hidden;*/
  /*}*/
  /*.avatar-uploader .el-upload:hover {*/
  /*border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
  /*font-size: 28px;*/
  /*color: #8c939d;*/
  /*width: 178px;*/
  /*height: 178px;*/
  /*line-height: 178px;*/
  /*text-align: center;*/
  /*}*/
  /*.avatar {*/
  /*width: 178px;*/
  /*height: 178px;*/
  /*display: block;*/
  /*}*/
</style>
