<style lang="less">
@import "./index.less";
</style>
<template>
  <div class="bookShow">
    <div class="book-item" v-for="(item,index) in bookList" :key="index">
      <nuxt-link :to="{ path: '/Info/bookInfo', query: { id: item.id }}">
        <div class="book-img">
          <img :src="item.picture" alt="" width="180" height="250">
          <div class="book-menu"><el-button type="primary" @click="addBtn(item.id)">加入购物车</el-button><el-button type="primary" @click="collectBtn(item.id)">收藏</el-button></div>
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
  import * as BookShowRequest from '../../assets/book-show/book-show'
  export default {
    props: {
      books: {
        type: Array,
        require: true
      }
    },
    data(){
      return{
        bookList: [],
        buyNumber: 1
      }
    },
    methods: {
      addBtn(id){
        BookShowRequest.addShoppingList(this,id)
      },
      collectBtn(id){
        BookShowRequest.addCollectList(this,id)
      }
    },
    watch:{
      books(){
        console.log(this.books)
        this.bookList = this.books
      }
    }
  }
</script>

