import Qs from 'qs'
export const getRecomment = (vm) =>{
  let data = Qs.stringify({
    extra1: '3.5'
  })
  vm.$axios.post('/permit/books/select/extra1',data)
    .then(rep =>{
      if(rep.data.result){
        rep.data.data.forEach(item =>{
          item.extra1 = parseInt(item.extra1)
          item.price = parseFloat(item.price)
        })
        vm.recommendGoods = rep.data.data
      }
    })
}

export const getLastedBooks = (vm) =>{
  vm.$axios.get('/permit/books/select/lasted')
    .then(rep =>{
      rep.data.data.forEach(item =>{
        item.extra1 = parseInt(item.extra1)
        item.price = parseFloat(item.price)
      })
      vm.lastedGoods = rep.data.data
    })
}


