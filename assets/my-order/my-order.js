import Cookies from 'js-cookie'
import Qs from 'qs'
export const getFinishData = (vm) =>{
  let data = Cookies.get('suserId')
  vm.$axios.get("/permit/order/select/userId?userId="+data)
    .then(rep=>{
      vm.tableFinishData = rep.data.data
    })
}

export const getUnFinishData = (vm) =>{
  let data = Cookies.get('suserId')
  vm.$axios.get("/permit/order/select/unfinished/userId?userId="+data)
    .then(rep=>{
      vm.tableData = rep.data.data
      console.log(rep.data.data)
    })
}

export const payPostpone = (vm,id) =>{
  let data = Qs.stringify({
    id: id
  })
  vm.$axios.post("/permit/order/pay/postpone/id",data)
    .then(rep=>{
      vm.$message.success("支付成功")
      getUnFinishData(vm)
    })
}

