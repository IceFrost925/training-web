<template>
  <div class="home">
    <Menu :menuItem="menuItem"></Menu>
    <div class="middle">
      <div class="block">
        <el-carousel style="height: 500px">
          <el-carousel-item  v-for="(item,index) in items" :key="index">
            <a href="#"><img :src="item" alt="" style="width: 100%;height: 100%"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <el-row class="recommendCard">
      <el-col :span="24">
        <div class="goodsRecommend">
          <h3 style="text-align: center"><span>搜/索/结/果 </span>&nbsp;</h3>
        </div>
        <div class="middle-goods">
          <BookShow :books="recommendGoods"></BookShow>
        </div>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>

  import Menu from '../../components/menu/menu'
  import BookShow from '../../components/book-show/index'
  import Footer from '../../components/footer/footer'
  export default {
    components: {
      Menu,
      Footer,
      BookShow
    },
    data(){
      return {
        menuItem: 'index',
        lastedGoods: [],
        recommendGoods: [],
        items: ['../img/img1.jpg', '../img/img2.jpg']
      }
    },
    methods: {},
    created(){
      console.log(this.$route.query.bookList)
      /*var storage=window.localStorage;
      this.recommendGoods = JSON.parse(storage.getItem("booksList"))*/
    }
  }
</script>

<style lang="less">
  @import "./home.less";
  .el-carousel__container{
    position: relative;
    height: 450px;
  }
</style>
