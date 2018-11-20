<style lang="less">
@import "./index.less";
</style>
<template>
  <div>
    <div class="book-item" v-for="(item,index) in bookList" :key="index">
      <nuxt-link :to="{ path: '/Info/bookInfo', query: { id: item.id }}">
        <div class="book-img">
          <img :src="item.picture" alt="" width="180" height="250">
          <div class="book-menu"><el-button type="primary">加入购物车</el-button><el-button type="primary">收藏</el-button></div>
        </div>
        <div>
          <span>{{item.name}}</span>
          <div class="book-show">
            <div><el-rate
              v-model="item.extra1"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></div>
            <div>￥{{item.price}}</div>
          </div>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      books: {
        type: Array,
        require: true
      }
    },
    data(){
      return{
        bookList: []
      }
    },
    watch:{
      books(){
        this.bookList = this.books
      }
    }
  }
</script>

