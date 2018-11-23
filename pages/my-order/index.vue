<template>
  <div class="myOrder">
    <Menu></Menu>
    <div class="middle">
      <el-tabs v-model="activeName" @tab-click="$handleClick">
        <el-tab-pane label="未完成订单" name="first">
          <div class="card-item" v-for="(item,index) in tableData">
            <el-card>
              <div slot="header" class="clearfix">
                <span>订单编号: {{index + 1}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="$payBtn(item.id)">点击支付</el-button>
              </div>
              <el-table
                :data="item.shoppings"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品名称">
                        <span>{{ props.row.bookId.name }}</span>
                      </el-form-item>
                      <el-form-item label="型号">
                        <span>{{ props.row.bookId.number }}</span>
                      </el-form-item>
                      <el-form-item label="单价">
                        <span>{{ props.row.bookId.price }}</span>
                      </el-form-item>
                      <el-form-item label="数量">
                        <span>{{ props.row.number }}</span>
                      </el-form-item>
                      <el-form-item label="合计">
                        <span>{{ props.row.bookId.price * props.row.number}}</span>
                      </el-form-item>
                      <el-form-item label="收件人">
                        <span>{{ item.address.name }}</span>
                      </el-form-item>
                      <el-form-item label="收件地址">
                        <span>{{ item.address.content }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ item.address.tell }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="bookId.picture" label="图片" width="300" height="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.bookId.picture" alt="" style="width: 50px;height: 50px">
                  </template>
                </el-table-column>
                <el-table-column prop="bookId.name" label="商品名称" width="300"></el-table-column>
                <el-table-column prop="bookId.number" label="型号" width="300"></el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成订单" name="second">
          <div class="card-item" v-for="(item,index) in tableFinishData">
            <el-card>
              <el-table
                :data="item.shoppings"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品名称">
                        <span>{{ props.row.bookId.name }}</span>
                      </el-form-item>
                      <el-form-item label="型号">
                        <span>{{ props.row.bookId.number }}</span>
                      </el-form-item>
                      <el-form-item label="单价">
                        <span>{{ props.row.bookId.price }}</span>
                      </el-form-item>
                      <el-form-item label="数量">
                        <span>{{ props.row.number }}</span>
                      </el-form-item>
                      <el-form-item label="合计">
                        <span>{{ props.row.bookId.price * props.row.number}}</span>
                      </el-form-item>
                      <el-form-item label="收件人">
                        <span>{{ item.address.name }}</span>
                      </el-form-item>
                      <el-form-item label="收件地址">
                        <span>{{ item.address.content }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ item.address.tell }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="bookId.picture" label="图片" width="300" height="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.bookId.picture" alt="" style="width: 50px;height: 50px">
                  </template>
                </el-table-column>
                <el-table-column prop="bookId.name" label="商品名称" width="300"></el-table-column>
                <el-table-column prop="bookId.number" label="型号" width="300"></el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as MyOrderRequest from '../../assets/my-order/my-order'
  import Menu from '../../components/menu/menu'
  import BookShow from '../../components/book-show/index'
  import Footer from '../../components/footer/footer'

  export default {
    components: {
      Menu,
      Footer,
      BookShow
    },
    data() {
      return {
        activeName: 'first',
        tableData: [],
        tableFinishData: [],
        address: {},
        totalPrice: 0
      }
    },
    methods: {
      $handleClick(tab) {
        console.log(tab)
        if (tab.index == 0) {
          MyOrderRequest.getUnFinishData(this)
        }
        if (tab.index == 1) {
          MyOrderRequest.getFinishData(this)
        }
      },
      $payBtn(id){
        MyOrderRequest.payPostpone(this,id)
      }
    },
    created() {
      MyOrderRequest.getUnFinishData(this)
    }
  }
</script>


<style lang="less">
  @import "./index.less";

</style>
