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
            <nuxt-link to="/search/search">
              <el-button type="text">搜索</el-button>
            </nuxt-link>
          </span>
      </div>
      <div class="box">
        <h1 style="color: #000000;padding-bottom: 30px">符合搜索条件的商品</h1>
        <div style="border: solid 1px #cbc6c6;height: 1px"></div>

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
      return {}
    },
    methods: {},

  }
</script>

<style>
  .main {
    margin: 0 150px;
    padding: 50px;
    min-height: 580px;
  }
  .box{
    padding-top: 20px;
    padding-left: 20px;
  }
</style>
