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
        Cookies.set('shoppingCount', rep.data.data.length);
        Cookies.set('TotalPrice', TotalPrice.toFixed(2));

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
    })
    .catch(function () {
      vm.$message.success('查询失败')
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

