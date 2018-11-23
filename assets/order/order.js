import Qs from "qs";
import Cookies from 'js-cookie'

export const getShopping = (vm, id) => {
  let data = Qs.stringify({
    userId: id
  })
  vm.$axios.post('/permit/shopping/select/userId', data)
    .then(rep => {
      if (rep.data.data.length >= 0) {
        let TotalPrice = 0
        rep.data.data.forEach(item => {
          TotalPrice += parseInt(item.number) * item.bookId.price
        })
        vm.TotalPrice = parseFloat(TotalPrice.toFixed(2))
        vm.shoppingCount = rep.data.data.length
        /*Cookies.set('shoppingCount', rep.data.data.length);
        Cookies.set('TotalPrice', TotalPrice.toFixed(2));*/

        rep.data.data.forEach(item => {
          item.totalMoney = (item.bookId.price * parseInt(item.number)).toFixed(2)
        })
        vm.tableData = rep.data.data
      } else {
        Cookies.set('shoppingCount', 0);
      }
    })
    .catch(function () {
      vm.$message.success('查询失败')
    })
}

export const updateItemNumber = (vm) => {
  let data = Qs.stringify({
    id: vm.shoppingId,
    number: vm.number
  })
  vm.$axios.post('/permit/shopping/update/number', data)
    .then(rep => {
      vm.$message.success('OK')
      getShopping(vm,Cookies.get("suserId"))
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

export const getWishList = (vm) => {
  let data = Qs.stringify({
    userId: Cookies.get("suserId"),
  })
  vm.$axios.post('/permit/collect/select/userId', data)
    .then(rep => {
      if (rep.data.data.length >= 0) {
        Cookies.set('wishList', rep.data.data.length);
        vm.collectData = rep.data.data
      }else{
        Cookies.set('wishList', 0);
      }
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

export const addShopping = (vm, row) => {
  let data = {
    bookIdId: row.bookId.id,
    number: "1",
    suserId: row.suser.id

  }
  console.log(data)
  vm.$axios.post('/permit/shopping', data)
    .then(rep => {
      if (rep.data.result) {
        vm.$message.success("添加成功")
        deleteWishList(vm, row)
      }
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

export const deleteWishList = (vm, row) => {
  vm.$axios.delete('/permit/collect/delete/id?id=' + row.id)
    .then(rep => {
      if (rep.data.result) {
        vm.$message.success("删除成功")
        getWishList(vm)
      }
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

export const deleteShopping = (vm, row) => {
  vm.$axios.delete('/permit/shopping/delete/id?id=' + row.id)
    .then(rep => {
      if (rep.data.result) {
        vm.$message.success("删除成功")
        getShopping(vm, Cookies.get("suserId"))
      }
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

//获取订单地址
export const getOrderAddress = (vm) =>{
  let data = Qs.stringify({
    userId: Cookies.get("suserId"),
    flag: vm.default
  })
  vm.$axios.post('/permit/addresses/default',data)
    .then(rep=>{
      console.log(rep)
      vm.addressList = rep.data.data
      vm.address = rep.data.data[0]
    })
}

//获取订单详情
export const getShoppingById = (vm) =>{
  vm.$axios.post('/permit/shopping/idList?idList='+vm.orderList)
    .then(rep=>{
      vm.totalPrice = 0
      vm.booksIdList = []
      vm.tableData = rep.data.data
      rep.data.data.forEach(item=>{
        vm.totalPrice += parseInt(item.number) * item.bookId.price
        vm.booksIdList.push(item.bookId.id)
      })
      vm.totalPrice = vm.totalPrice.toFixed(2)
    })
}

//删除shopping中已购买的商品
export const deleteShoppingById = (vm) =>{
  vm.$axios.delete('/permit/shopping/delete/idList?idList='+vm.orderList)
    .then(rep=>{
      console.log(rep)
    })
}


//添加到未完成订单
export const addUnfinishOrider = (vm) =>{
  let data = {
    addressIdId: vm.address.id,
    books: JSON.stringify(vm.orderList),
    extra2: 'isActive',
    suserId: Cookies.get("suserId")
  }
  vm.$axios.post("/permit/order",data)
    .then(rep=>{
      vm.$message.success("请选择支付方式")
      deleteShoppingById(vm)
    })
}

//添加完成订单
export const payOrderFinish = (vm) =>{
  let data = Qs.stringify({
    userId: Cookies.get("suserId"),
    extra2: 'isActive'
  })
  vm.$axios.post("/permit/order/pay",data)
    .then(rep=>{
      vm.$message.success("支付成功")
    })
    .catch(function () {
      vm.$message.success("异常情况")
    })
}

//修改支付状态
export const payOrderStatus = (vm) =>{
  let data = Qs.stringify({
    userId: Cookies.get("suserId"),
    extra2: 'isActive'
  })
  vm.$axios.post("/permit/order/pay/status",data)
    .then(rep=>{
      console.log(rep)
    })
    .catch(function () {
      vm.$message.success("异常情况")
    })
}
