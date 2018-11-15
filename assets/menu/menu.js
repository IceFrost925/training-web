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
        vm.shopCardList = rep.data.data
      }
    })
    .catch(function () {
      vm.$message.success('查询失败')
    })
}
