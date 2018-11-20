<template>
  <div>
    <Menu :menuItem="menuItem"></Menu>
    <div class="container">
      <div class="el-header">
          <span style="font-size: 16px">
            <nuxt-link to="/home/home">
              <el-button type="text">首页</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/cartoon/cartoon">
              <el-button type="text">{{first}}</el-button>
            </nuxt-link>
          </span>
    </div>
      <div class="content">
        <div class="left-coon">
          <span style="padding-left: 20px">商品分类</span>
          <el-menu
            :default-active="menuItem"
            class="el-menu-vertical-demo"
            :unique-opened="flag"
            :default-openeds="all"
            @select="handleSelect">
            <el-submenu :index="item.first" v-for="(item,index) in menuList" :key="index">
              <template slot="title">{{item.first}}</template>
              <el-menu-item :index="sec" v-for="(sec,index) in item.second" :key="index" v-if="item.second">{{sec}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="right-coon">
          <div>
            <h3>{{first}}</h3>
            <BookShow :books="lastedGoods"></BookShow>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Menu from '../../components/menu/menu'
  import Footer from '../../components/footer/footer'
  import BookShow from '../../components/book-show/index'
  import * as CarToonRequest from '../../assets/cartoon/cartoon'
  export default {
    components: {
      Menu,
      Footer,
      BookShow
    },
    data(){
      return {
        menuItem: '动漫',
        menuList: [],
        first: '动漫',
        all: [],
        flag: true,
        lastedGoods: []
      }
    },
    methods: {
      handleSelect(key, keyPath){
        console.log(key)
        this.menuItem = key
        this.activityIndex = key
        this.first = keyPath[0]
        CarToonRequest.getBookByType(this)
      }

    },
    created(){
      CarToonRequest.getMenus(this)
      if(this.$route.params.menuType !== null){
        this.menuItem = this.$route.params.menuType
        this.activityIndex = this.$route.params.menuType
        this.first = this.$route.params.first
        this.all = this.$route.params.all
      }
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
    padding-left: 30px;
    display: inline-block;
  }

</style>
