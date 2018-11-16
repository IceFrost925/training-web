import Cookies from 'js-cookie'
import Qs from 'qs'

export const getUserInfo = (vm) => {
  let data = Qs.stringify({
    username: Cookies.get("username")
  })

  vm.$axios.post('/permit/suser/select', data)
    .then(rep => {
      console.log(rep)
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
      vm.$message.success("修改成功")
      Cookies.set('username', vm.name);
      getUserInfo(this)
    })

}

export const addAdress = (vm) => {
  let data = {
    company: "string",
    content: "string",
    email: "string",
    extra1: "string",
    extra2: "string",
    flag: true,
    name: "string",
    suserId: 0,
    tell: "string"
  }

  vm.$axios.post("/permit/addresses",data)
    .then(rep =>{
      console.log(rep)
    })
}
