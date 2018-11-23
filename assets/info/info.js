import Cookies from 'js-cookie'
import Qs from 'qs'

export const getUserInfo = (vm) => {
  let data = Qs.stringify({
    username: Cookies.get("username")
  })
  vm.$axios.post('/permit/suser/select', data)
    .then(rep => {
      vm.name = rep.data.data.username
      vm.email = rep.data.data.email
      vm.phone = rep.data.data.tell
      vm.suser = rep.data.data
    })
    .catch(function () {
      vm.$message.success('异常情况')
    })
}

export const updateUserInfo = (vm) => {
  let data = {
    id: vm.suser.id,
    email: vm.email,
    tell: vm.phone,
    username: vm.name,
    extra1: vm.suser.extra1,
    passwd: vm.suser.passwd
  }
  vm.$axios.post('/permit/suser/update', data)
    .then(rep => {
      Cookies.set('username', vm.name);
      vm.$message.success("修改成功")
      getUserInfo(this)
    })

}

export const updatePassword = (vm) =>{
  let data = {
    id: vm.suser.id,
    email: vm.email,
    tell: vm.phone,
    username: vm.name,
    extra1: vm.suser.extra1,
    passwd: vm.psd2
  }
  vm.$axios.post('/permit/suser/update', data)
    .then(rep => {
      Cookies.set('username', vm.name);
      vm.$message.success("修改成功")
      getUserInfo(this)
    })

}
