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
          <h3 style="text-align: center"><span>推/荐/商/品 </span>&nbsp;</h3>
        </div>
        <div class="middle-goods">
          <BookShow :books="recommendGoods"></BookShow>
        </div>
      </el-col>
    </el-row>
    <el-row class="recommendCard">
      <el-col :span="24">
        <div class="goodsRecommend">
          <h3 style="text-align: center"><span>最/新/商/品 </span>&nbsp;</h3>
        </div>
        <div class="middle-goods">
          <BookShow :books="lastedGoods"></BookShow>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content-bottom">
          <div class="content-bottom-item">
            <div class="bottom-item-title">
              <hr class="line">
              <el-button>动漫</el-button>
              <hr class="line">
            </div>
            <ul>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-bottom-item">
            <div class="bottom-item-title">
              <hr class="line">
              <el-button>文学</el-button>
              <hr class="line">
            </div>
            <ul>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-bottom-item">
            <div class="bottom-item-title">
              <hr class="line">
              <el-button>科学</el-button>
              <hr class="line">
            </div>
            <ul>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="li-item">
                  <img src="../static/img/product1.png" alt="" width="100" height="100">
                  <div class="li-item-right">
                    <div class="li-item-name">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                    <div>￥{{222}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as HomeRequest from '../assets/home/index'
  import Menu from '../components/menu/menu'
  import BookShow from '../components/book-show/index'
  import Footer from '../components/footer/footer'
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
      HomeRequest.getRecomment(this)
      HomeRequest.getLastedBooks(this)
    }
  }
</script>

<style lang="less">
  @import "./index.less";
  .el-carousel__container{
    position: relative;
    height: 450px;
  }
</style>
