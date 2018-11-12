<template>
  <div>
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

    <el-row :gutter="20" class="recommendCard">
      <el-col :span="19" :offset="3">
        <div class="goodsRecommend">
          <h3 style="text-align: center"><span>推/荐/商/品 </span>&nbsp;</h3>
        </div>
        <div class="middle-goods">
          <!--<showGoods :course-data="goods"></showGoods>-->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="recommendCard">
      <el-col :span="19" :offset="3">
        <div class="goodsRecommend">
          <h3 style="text-align: center"><span>最/新/商/品 </span>&nbsp;</h3>
        </div>
        <div class="middle-goods">
          <!--<showGoods :course-data="recommendGoods"></showGoods>-->
        </div>
      </el-col>
    </el-row>
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
      return {
        menuItem: 'index',
        goods: [],
        recommendGoods: [],
        items: ['../img/img1.jpg', '../img/img2.jpg']
      }
    },
    methods: {},

  }
</script>

<style>
  @import "./home.less";
  .el-carousel__container{
    position: relative;
    height: 450px;
  }
</style>
