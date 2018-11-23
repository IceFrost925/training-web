import Qs from 'qs'
import Cookies from 'js-cookie'
export const getBookInfo = (vm) =>{
  let data = Qs.stringify({
    id: vm.id
  })
  vm.$axios.post("/permit/books/select/id",data)
    .then(rep =>{
      getBookApprice(vm)
      vm.book = rep.data.data
    })
}

export const getBookApprice = (vm) =>{
  let data = Qs.stringify({
    bookId: vm.id
  })
  vm.$axios.post("/permit/apparaise/select/bookId",data)
    .then(rep =>{
        vm.apprice = rep.data.data
    })
}

export const addBookApprice = (vm) =>{
  let data = {
    bookIdId: vm.id,
    content: vm.form.comment,
    star: vm.form.star,
    suserId: Cookies.get("suserId")
  }
  vm.$axios.post("/permit/apparaise",data)
    .then(rep =>{
       console.log(rep)
      vm.form.star = 0
      vm.form.comment = ''
      getBookApprice(vm)
      vm.$message.success("发表成功")
    })
    .catch(function () {
      vm.$message.success("异常情况")

    })
}

export const addShoppingList = (vm) =>{
  let data = {
    bookIdId: vm.book.id,
    number: vm.buyNumber,
    suserId: Cookies.get("suserId")
  }
  vm.$axios.post("/permit/shopping",data)
    .then(rep =>{
      vm.$message.success("添加成功")
    })
    .catch(function () {
      vm.$message.success("异常情况")

    })
}

