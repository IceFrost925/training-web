<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div>
    <Menu :menuItem="menuItem"></Menu>
    <div class="main">
      <div class="el-header">
          <span style="font-size: 16px">
            <nuxt-link to="/home/home">
              <el-button type="text">首页</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/order/shopping">
              <el-button type="text">购物车</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/order/account">
              <el-button type="text">结账</el-button>
            </nuxt-link>
          </span>
      </div>
      <div class="box">
        <h2>结账</h2>
      </div>
      <div>
        <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
          <el-step title="选择收货地址"></el-step>
          <el-step title="确认订单信息"></el-step>
          <el-step title="选择支付方式"></el-step>
        </el-steps>
      </div>
      <div class="address-info" v-if="active === 0">
        <el-card class="address-box">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px"><strong>{{personName}}</strong></span><span>&nbsp;收</span>
            <el-button style="float: right; padding: 3px 0" type="success" icon="el-icon-check" circle></el-button>
          </div>
          <h3>{{personPhone}}</h3><h3 style="padding-top: 10px">{{personAddress}}</h3>
        </el-card>
      </div>
      <div class="goods-info" v-if="active === 1">
        <el-card>
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column width="100"></el-table-column>
            <el-table-column prop="bookName" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="bookNumber" label="型号" width="120"></el-table-column>
            <el-table-column prop="buyNumber" label="数量" width="130"></el-table-column>
            <el-table-column prop="price" label="价格" width="130"></el-table-column>
            <el-table-column prop="total" label="合计" width="140"></el-table-column>
            <el-table-column width="100"></el-table-column>
          </el-table>
          <div class="count-box">
            <label>免运费 : ￥ 0.00</label>
            <h1></h1>
            <label>订单总金额 : {{totalMoney}}</label>
          </div>
        </el-card>
      </div>
      <div class="pay-info" v-if="active === 2">
        <el-card class="pay-card">
          <el-radio-group v-model="radio">
            <el-radio :label="1">支付宝</el-radio>
            <el-radio :label="2">微信</el-radio>
            <el-radio :label="3">银行转账</el-radio>
            <el-radio :label="4">货到付款</el-radio>
          </el-radio-group>
        </el-card>
      </div>
      <div class="next-btn">
        <el-button style="margin-top: 12px;" @click="prev" v-if="active==1||active==2">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next" v-if="active==0||active==1">下一步</el-button>
        <el-button style="margin-top: 12px;" v-if="active==2">提交订单</el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {
      ElButton,
      Menu,
      Footer
    },
    data(){
      return {
        menuItem: 'index',
        active: 0,
        totalMoney: '1110.00',
        tableData: [
          {
            bookName: '岛上书店',
            bookNumber: '111111',
            buyNumber: '2',
            price: '100',
            total: '200'
          },
          {
            bookName: '岛上书店',
            bookNumber: '111111',
            buyNumber: '2',
            price: '100',
            total: '200'
          }
        ],
        personName: '冯世杰',
        personPhone: '18851162269',
        personAddress: '江苏省南京市栖霞区羊山北路1号',
        items: '',
        radio: 1
      }
    },
    methods: {
      prev(){
        --this.active;
        if (this.active < 0) this.active = 0;
      },
      next(){
        if (this.active++ > 2) this.active = 0;
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

  .box {
    box-shadow: 0 1px 0 #cbc6c6;
    padding: 20px 10px;
  }

  .count-box {
    margin-top: 50px;
    padding: 20px 10px;
    width: 250px;
    margin-left: 60%;
    border: 1px solid #dad5d5;
    border-radius: 5px;
  }

  .address-box {
    width: 280px;
  }

  .pay-card{
    height: 300px;
    text-align: center;
    padding-top: 130px;
  }
  .next-btn {
    margin-top: 30px;
    text-align: center;
  }
  .el-card__body {
    display: inherit;
  }
</style>
