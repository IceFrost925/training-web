<style lang="less">
  @import "./menu.less";
</style>
<template>
  <div class="menu">
    <div class="menu-content">
      <el-row class="menu-row1">
        <el-col :span="12">
          <span>尊敬的用户您好！</span>
          <nuxt-link to="#">[登录]</nuxt-link>
          <nuxt-link to="#">[注册]</nuxt-link>
        </el-col>
        <el-col :span="12" class="top-menu-right">
        <span><el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            会员中心<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">会员注册</el-dropdown-item>
            <el-dropdown-item command="b">会员登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown></span>
          <nuxt-link to="#">收藏 ({{wishList}})</nuxt-link>
          <nuxt-link to="#">购物车</nuxt-link>
          <nuxt-link to="#">结账</nuxt-link>
        </el-col>
      </el-row>
      <el-row class="menu-row2">
        <el-col :span="12">
          <img src="http://theme.opencartdemo.cn/book-2102-cn/image/catalog/logo3.png" alt="">
        </el-col>
        <el-col :span="12" class="top-menu-right">
          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <nuxt-link to="#">{{shoppingCount}}-个商品 -￥{{shoppingTotal}}</nuxt-link><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <div v-if="shoppingCount == 0">您的购物车内暂无商品</div>
              <div v-else>
                <el-dropdown-item command="a">会员注册</el-dropdown-item>
                <el-dropdown-item command="b">会员登陆</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>
    </div>
    <div class="menu-list">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu :index="item.first"  v-for="(item,index) in menuList" :key="index">
          <template slot="title">{{item.first}}</template>
          <el-menu-item :index="sec" v-for="(sec,index) in item.second" :key="index" v-if="item.second">{{sec}}</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="menu-query">
        <el-input v-model="query" placeholder="请输入内容" class="input-with-select menu-query-input">
          <el-button slot="append" icon="el-icon-search" class="menu-query-button" @click="$btn_search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import * as MenuRequest from '../../assets/menu/menu'
  export default {
    Props: {
      menuItem: {
        type: String,
        default: 'index'
      }
    },
    data(){
      return{
        menuList: [],
        wishList: 0,
        shoppingCount: 0,
        shoppingTotal: 0.00,
        activeIndex2: '1',
        query: ''
      }
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      $btn_search(){

      }
    },
    created(){
      MenuRequest.getMenus(this)
    },
    watch:{
      menuItem(){
        this.activeIndex2 = this.menuItem;
      }
    }
  }
</script>

