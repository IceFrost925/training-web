<template>
  <div>
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
  </div>
</template>

<script>

  export default {

    data(){
      return {
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
</style>
