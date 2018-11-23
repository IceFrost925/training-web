<template xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
  <div>
    <Menu></Menu>
    <div class="main">
      <div class="el-header">
          <span style="font-size: 16px">
            <nuxt-link to="/">
          <el-button type="text">首页</el-button>
        </nuxt-link>
        <span>/</span>
        <nuxt-link to="/order/collect">
          <el-button type="text">收藏</el-button>
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
      <no-ssr>
        <div class="address-info" v-if="active === 0">
          <el-tabs v-model="activeName" @tab-click="$handleClick">
            <el-tab-pane label="默认地址" name="first">
              <div v-for="(item,index) in addressList" :key="index" @click="$selectAddress(item,index)" class="other-address">
                <el-card class="address-box">
                  <div slot="header">
                    <span style="font-size: 18px"><strong>{{item.name}}</strong></span><span>&nbsp;收</span>
                    <i style="float: right; padding: 3px 0;color: green" class="el-icon-success"></i>
                  </div>
                  <h3>手机号：{{item.tell}}</h3>
                  <h3 style="padding-top: 10px">公司地址：{{item.company}}</h3>
                  <h3 style="padding-top: 10px">详细地址{{item.content}}</h3>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="其他地址" name="second">
              <div v-for="(item,index) in addressList" :key="index" @click="$selectAddress(item,index)" class="other-address">
                <el-card class="address-box" >
                  <div slot="header">
                    <span style="font-size: 18px"><strong>{{item.name}}</strong></span><span>&nbsp;收</span>
                    <i style="float: right; padding: 3px 0;color:green;" class="el-icon-success" v-if="selectId == index"></i>
                  </div>
                  <h3>手机号：{{item.tell}}</h3>
                  <h3 style="padding-top: 10px">公司地址：{{item.company}}</h3>
                  <h3 style="padding-top: 10px">详细地址：{{item.content}}</h3>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
        <div class="goods-info" v-if="active === 1">
          <el-card>
            <el-table :data="tableData" style="width: 100%;">
              <el-table-column fixed prop="bookId.picture" label="图片" width="150" height="200">
                <template slot-scope="scope">
                  <img  :src="scope.row.bookId.picture" alt="" style="width: 50px;height: 50px">
                </template>
              </el-table-column>
              <el-table-column prop="bookId.name" label="商品名称" width="150"></el-table-column>
              <el-table-column prop="bookId.number" label="型号" width="120"></el-table-column>
              <el-table-column prop="number" label="数量" width="130"></el-table-column>
              <el-table-column prop="bookId.price" label="价格" width="130"></el-table-column>
              <el-table-column prop="totalMoney" label="合计" width="140">
                <template slot-scope="scope">
                  {{(scope.row.bookId.price * scope.row.number).toFixed(2)}}
                </template>
              </el-table-column>
              <el-table-column width="100"></el-table-column>
            </el-table>
            <div class="count-box">
              <h5>收件人 : {{address.name}}</h5>
              <br>
              <h5>订单总金额 : {{totalPrice}}</h5>
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
      </no-ssr>

      <div class="next-btn">
        <el-button style="margin-top: 12px;" @click="prev" v-if="active==1||active==2">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next" v-if="active==0||active==1">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="$payBtn" v-if="active==2">提交订单</el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as OrderRequest from '../../assets/order/order'
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer
    },
    data() {
      return {
        activeName: 'first',
        addressList: [],
        orderList:[],   //订单id
        tableData:[],  //表格数据
        address: {},  //邮寄地址
        booksIdList: [],
        active: 0,
        selectId: 0,
        default: true,
        status: true,
        totalPrice: 0,
        items: '',
        radio: 1
      }
    },
    methods: {
      prev() {
        --this.active;
        if (this.active < 0) this.active = 0;
      },
      next() {
        if (this.active++ > 2) this.active = 0;
        if(this.active==2){
          OrderRequest.addUnfinishOrider(this)
        }
      },
      $handleClick(tab){
        if(tab.index == '1'){
          this.default = false
        }else if(tab.index == '0'){
          this.default = true
        }
        OrderRequest.getOrderAddress(this)
      },
      $selectAddress(item,index){
        this.selectId = index
        this.address = this.addressList[index]
      },
      $payBtn(){
        this.status = !this.status
        OrderRequest.payOrderFinish(this)
      }
    },
    created(){
      if(this.$route.query.orderList.length > 0) {
        this.orderList = this.$route.query.orderList
      }
      OrderRequest.getShoppingById(this)
      OrderRequest.getOrderAddress(this)
    },
    beforeRouteLeave (to, from, next) {
      if(this.active==2 && this.status){
        OrderRequest.payOrderStatus(this)
      }
      next()
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

  .other-address{
    display: inline-block;
    margin: 10px 20px;
  }

  .pay-card {
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
