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
        <nuxt-link to="/order/shopping">
          <el-button type="text">购物车</el-button>
        </nuxt-link>
        <span>/</span>
        <nuxt-link to="/order/collect">
          <el-button type="text">收藏</el-button>
        </nuxt-link>
        </span>
      </div>
      <div class="box">
        <h1 style="color: #000000;padding-bottom: 30px">我的收藏夹</h1>
        <el-card>
          <el-table :data="collectData" style="width: 100%;">
            <el-table-column fixed prop="bookId.picture" label="图片" width="150" height="200">
              <template slot-scope="scope">
                <img :src="scope.row.bookId.picture" alt="" style="width: 50px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column prop="bookId.name" label="商品名称" width="150"></el-table-column>
            <el-table-column prop="bookId.id" label="型号" width="120"></el-table-column>
            <el-table-column prop="bookId.count" label="库存" width="120"></el-table-column>
            <el-table-column prop="bookId.price" label="单价" width="120"></el-table-column>
            <el-table-column label="管理" width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">
                  移除
                </el-button>
                <el-button @click.native.prevent="addShopping(scope.row)" type="text" size="small">
                  加入购物车
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
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
        menuItem: 'index',
        collectData: []
      }
    },
    methods: {
      deleteRow(row) {
        OrderRequest.deleteWishList(this, row)
      },
      addShopping(row) {
        OrderRequest.addShopping(this, row)
      }
    },
    created() {
      OrderRequest.getWishList(this)
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

  .box {
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
  }

  .el-button + .el-button {
    margin-left: 0;
  }

</style>
