import Qs from 'qs'
import Cookies from 'js-cookie';
export const getRegister = (vm) => {
  let data = {
    email: vm.formReg.email,
    passwd: vm.formReg.password1
  }
  vm.$axios.post('/permit/suser/insert', data)
    .then(rep => {
      if (rep.data.result) {
        vm.$message.success('注册成功')
        vm.$router.push({
          name: 'index'
        })
      } else {
        vm.$message.success('注册失败')
      }
    })
    .catch(function () {
      vm.$message.success('注册失败')
    })
}

export const getLogin = (vm) => {
  let data = Qs.stringify({
    username: vm.form.username,
    password: vm.form.password
  })
  vm.$axios.post('/permit/suser/login', data)
    .then(rep => {
      if (rep.data.data !== null) {
        getWishList(vm,rep.data.data.id)
        getShoppingCount(vm,rep.data.data.id)
        vm.$message.success('登录成功')
        Cookies.set('username', rep.data.data.username);
        Cookies.set('email', rep.data.data.email);
        Cookies.set('phone', rep.data.data.tell);
        Cookies.set('suserId', rep.data.data.id);
        vm.$router.push({
          name: 'index'
        })
        }else {
          vm.$message.success('登录失败')
        }
    })
    .catch(function () {
      vm.$message.success('登录失败')
    })
}

export const getWishList = (vm,id) => {
  let data = Qs.stringify({
    userId: id
  })
  vm.$axios.post('/permit/collect/select/userId', data)
    .then(rep => {
      if (rep.data.data.length>=0) {
        Cookies.set('wishList', rep.data.data.length);
      }else{
        Cookies.set('wishList', 0);
      }
    })
    .catch(function () {
      vm.$message.success('查询失败')
    })
}

export const getShoppingCount = (vm,id) => {
  let data = Qs.stringify({
    userId: id
  })
  vm.$axios.post('/permit/shopping/select/userId', data)
    .then(rep => {
      if (rep.data.data.length>=0) {
        console.log(rep)
        let TotalPrice = 0
        rep.data.data.forEach(item =>{
          TotalPrice += parseInt(item.number) * item.bookId.price
        })
        Cookies.set('shoppingCount', rep.data.data.length);
        Cookies.set('TotalPrice', TotalPrice);
      }else{
        Cookies.set('shoppingCount', 0);
      }
    })
    .catch(function () {
      vm.$message.success('查询失败')
    })
}

