<template>
  <div class="main">
    <el-container>
      <el-header>
          <span style="font-size: 16px">
            <nuxt-link to="/home/home">
              <el-button type="text">首页</el-button>
            </nuxt-link>
            <span>/</span>
            <nuxt-link to="/cartoon/cartoon">
              <el-button type="text">动漫</el-button>
            </nuxt-link>
          </span>
      </el-header>
      <el-container>
        <el-aside width="250px" class="border">
          <span style="padding-left: 20px">商品分类</span>
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-caret-right"></i>
                <nuxt-link to="/cartoon/cartoon">
                  <el-button type="text" style="color: #000000">动漫</el-button>
                </nuxt-link>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"><i class="el-icon-arrow-right"></i>海伦凯勒</el-menu-item>
                <el-menu-item index="1-2"><i class="el-icon-arrow-right"></i>邦士度</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-caret-right"></i>
                <nuxt-link to="/literature/literature">
                  <el-button type="text" style="color: #000000">文学</el-button>
                </nuxt-link>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1"><i class="el-icon-arrow-right"></i>shes茜子</el-menu-item>
                <el-menu-item index="2-2"><i class="el-icon-arrow-right"></i>艾薇莎</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-caret-right"></i>
                <nuxt-link to="/science/science">
                  <el-button type="text" style="color: #000000">科学</el-button>
                </nuxt-link>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1"><i class="el-icon-arrow-right"></i>暴龙</el-menu-item>
                <el-menu-item index="3-2"><i class="el-icon-arrow-right"></i>阿木</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <div class="box">
            <h3>科学</h3>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {

    data(){
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },

  }
</script>

<style>
  .main {
    position: absolute;
    margin: 100px 150px;
    padding: 50px;
  }

  .border {
    border: 1px solid #dad5d5;
    border-radius: 5%;
    padding: 20px;
  }

  .box {
    box-shadow: 0 1px 0 #888;
    width: 600px;
    padding-bottom: 5px;
  }
</style>
