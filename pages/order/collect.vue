<template>
  <div>
    <el-container class="main">
      <el-header>
          <span style="font-size: 16px">
            <nuxt-link to="/home/home">
              <el-button type="text">首页</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/order/collect">
              <el-button type="text">我的收藏</el-button>
            </nuxt-link>
          </span>
      </el-header>
      <el-main>
        <h1 style="color: #000000;padding-bottom: 30px">我的收藏夹</h1>
        <el-card>
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column fixed prop="pic" label="图片" width="150" height="200">
              <!--<template slot-scope="scope">-->
              <!--<img :src="pic" alt="" style="width: 100%;height: 100%">-->
              <!--</template>-->
            </el-table-column>
            <el-table-column prop="bookName" label="商品名称" width="160"></el-table-column>
            <el-table-column prop="bookNumber" label="型号" width="120"></el-table-column>
            <el-table-column prop="number" label="库存" width="100"></el-table-column>
            <el-table-column prop="price" label="单价" width="120"></el-table-column>
            <el-table-column fixed="right" label="管理" width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                  移除
                </el-button>
                <el-button @click.native.prevent=" " type="text" size="small">
                  加入购物车
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>

  export default {

    data(){
      return {
        tableData: [{
          pic: '../img/head.png',
          bookName: '岛上书店',
          bookNumber: '111111',
          number: '2000',
          price: '100',
        },
          {
            pic: '../img/head.png',
            bookName: '岛上书店',
            bookNumber: '111111',
            number: '2411',
            price: '100',
          }]
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },

  }
</script>

<style>
  .main {
    position: absolute;
    margin: 100px 100px;
    padding: 50px;
  }
  .el-button+.el-button {
    margin-left: 0;
  }

</style>
