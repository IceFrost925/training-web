import Qs from 'qs'

export const getMenus = (vm) =>{
  vm.$axios.get("/permit/menus/select/all")
    .then(rep =>{
      vm.menuList = rep.data.data;
      getBookByType(vm)
    })
}

export const getBookByType = (vm) =>{
  let data = Qs.stringify({
    type: vm.activityIndex
  })
  vm.$axios.post("/permit/books/select/type?type="+vm.activityIndex)
    .then(rep =>{
      console.log(rep)
      rep.data.data.forEach(item =>{
        item.extra1 = parseInt(item.extra1)
      })
      vm.lastedGoods = rep.data.data
    })
}

