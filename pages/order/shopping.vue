<template>
  <div>
    <Menu :TotalPrice="TotalPrice" :shoppingCount="shoppingCount"></Menu>
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
          </span>
      </div>
      <div class="buy-box">
        <h1 style="color: #000000;padding-bottom: 30px">购物车内的商品</h1>
        <el-card>
          <el-table
            :data="tableData"
            style="width: 100%;"
            @row-click="$changeId"
            @selection-change="$handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column fixed prop="bookId.picture" label="图片" width="150" height="200">
              <template slot-scope="scope">
                <img  :src="scope.row.bookId.picture" alt="" style="width: 50px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column prop="bookId.name" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="bookId.id" label="型号" width="120"></el-table-column>
            <el-table-column prop="number" label="数量" width="200" >
              <template slot-scope="scope">
                <el-input-number style="width: 140px" v-model="scope.row.number" @change="$changeNumber" :min="1"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="bookId.price" label="单价" width="120"></el-table-column>
            <el-table-column prop="totalMoney" label="总价" width="120">
              <template slot-scope="scope">
                {{(scope.row.bookId.price * scope.row.number).toFixed(2)}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <div class="total">
          <label>订单总金额 : {{total}}</label>
        </div>
        <div class="btn">
          <el-button type="primary" @click="$orderBuy" :disabled=goOrder>去结账</el-button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  import * as OrderRequest from '../../assets/order/order'
  export default {
    components: {
      Menu,
      Footer
    },
    data(){
      return {
        goOrder: true,
        number: 0,
        tableData: [],
        selectItem: [],
        shoppingId: 0,
        total: 0,
        TotalPrice: 0,
        shoppingCount: 0
      }
    },
    methods: {
      deleteRow(row) {
        OrderRequest.deleteShopping(this,row)
      },
      $changeId(row, event, column){
        this.shoppingId = row.id
      },
      $changeNumber(val){
        this.number = val
        OrderRequest.updateItemNumber(this)
      },
      $handleSelectionChange(val){
        this.total = 0;
        this.selectItem = []
        val.forEach(item=>{
          this.total += parseInt(item.number) * item.bookId.price
          this.selectItem.push(item.id)
        })
        this.total = this.total.toFixed(2)
        if(val.length>0){
          this.goOrder = false
        }else{
          this.goOrder = true
        }
      },
      $orderBuy(){
        this.$router.push({
            path: '/order/account',
            query: {
              orderList: this.selectItem
            }
          })
      }
    },
    created(){
      OrderRequest.getShopping(this,Cookies.get("suserId"))
    }
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

  .buy-box {
    padding-top: 20px;
    padding-left: 20px;
  }

  .total {
    box-shadow: 0 1px 0 #888;
    padding: 50px;
  }
  label {
    margin-left: 70%;
  }

  .btn {
    margin: 30px 30px 2px 82%;
  }
</style>
