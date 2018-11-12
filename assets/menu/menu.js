export const getMenus = (vm) =>{
  vm.$axios.get("/permit/menus/select/all")
    .then(rep =>{
      vm.menuList = rep.data.data;
    })
}
