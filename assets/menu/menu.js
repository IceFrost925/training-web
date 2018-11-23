import Qs from "qs";
import Cookies from "js-cookie";

export const getMenus = (vm) =>{
  vm.$axios.get("/permit/menus/select/all")
    .then(rep =>{
      vm.menuList = rep.data.data;
    })
}

export const getShoppingCount = (vm,id) => {
  let data = Qs.stringify({
    userId: id
  })
  vm.$axios.post('/permit/shopping/select/userId', data)
    .then(rep => {
      if (rep.data.data.length>=0) {
        let TotalPrice = 0
        rep.data.data.forEach(item =>{
          TotalPrice += parseInt(item.number) * item.bookId.price
        })

        vm.Count= rep.data.data.length
        vm.shoppingTotal = parseFloat(TotalPrice.toFixed(2))
        vm.shopCardList = rep.data.data
      }
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
        vm.wishList = rep.data.data.length

      }
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}


export const selectBookByName = (vm) =>{
  let data = Qs.stringify({
    name: vm.query
  })
  vm.$axios.post('/permit/books/select/name',data)
    .then(rep =>{
      if(rep.data.data.length>0){
        rep.data.data.forEach(item =>{
          item.extra1 = parseInt(item.extra1)
          item.price = parseFloat(item.price)
        })
        console.log(rep.data.data)
        vm.books = rep.data.data
      }else{
        vm.$message.success("暂无此书")
      }

    })
}
