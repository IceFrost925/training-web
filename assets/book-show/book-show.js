import Cookies from "js-cookie";

export const addShoppingList = (vm,id) =>{
  let data = {
    bookIdId: id,
    number: vm.buyNumber,
    suserId: Cookies.get("suserId")
  }
  vm.$axios.post("/permit/shopping",data)
    .then(rep =>{
      console.log(rep)
      vm.$message.success("添加成功")
    })
    .catch(function () {
      vm.$message.success("异常情况")

    })
}

export const addCollectList = (vm,id) =>{
  let data = {
    bookIdId: id,
    suserId: Cookies.get("suserId")
  }
  vm.$axios.post("/permit/collect",data)
    .then(rep =>{
      Cookies.set('wishList', rep.data.data.length);
      vm.$message.success("添加成功")
    })
    .catch(function () {
      vm.$message.success("异常情况")

    })
}
