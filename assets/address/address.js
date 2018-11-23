import Cookies from 'js-cookie'
import Qs from 'qs'
export const getAllAddress = (vm) =>{
  let data = Cookies.get("suserId")
  vm.$axios.get('/permit/addresses/all/userId?userId='+data)
    .then(rep =>{
      vm.addressList = rep.data.data
      console.log(rep)
    })
    .catch(function () {
      vm.$message.success("异常情况")
    })
}

export const insertAddress = (vm) =>{
  let data = {
    company: vm.ruleForm.companyAds,
    content: vm.ruleForm.homeAds,
    email: vm.ruleForm.email,
    name: vm.ruleForm.name,
    suserId: Cookies.get("suserId"),
    tell: vm.ruleForm.phone,
    extra1: "'1'",
  }
  vm.$axios.post('/permit/addresses',data)
    .then(rep =>{
      getAllAddress(vm)
      vm.$message.success("添加成功")
    })
    .catch(function () {
      vm.$message.success("添加失败")
    })
}

export const updateAddress = (vm) =>{
  let data = {
    id: vm.rowItem.id,
    company: vm.ruleForm.companyAds,
    content: vm.ruleForm.homeAds,
    email: vm.ruleForm.email,
    flag: vm.rowItem.flag,
    name: vm.ruleForm.name,
    suserId: Cookies.get("suserId"),
    tell: vm.ruleForm.phone,
    extra1: vm.rowItem.extra1,
  }
  vm.$axios.put('/permit/addresses/update',data)
    .then(rep =>{
      getAllAddress(vm)
      vm.$message.success("修改成功")
    })
    .catch(function () {
      vm.$message.success("修改失败")
    })
}

export const deleteAddress = (vm,row) =>{
  vm.$axios.delete('/permit/addresses/delete?userId='+Cookies.get("suserId")+'&addressId='+row.id)
    .then(rep =>{
      getAllAddress(vm)
      vm.$message.success("删除成功")
    })
    .catch(function () {
      vm.$message.success("删除失败")
    })
}

export const updateDefaultAddress = (vm,item) =>{
  let data = Qs.stringify({
    userId: Cookies.get("suserId"),
    AddressId: item.id
  })
  vm.$axios.post('/permit/addresses/update/default',data)
    .then(rep =>{
      getAllAddress(vm)
      vm.$message.success("修改成功")
    })
    .catch(function () {
      vm.$message.success("修改失败")
    })
}
