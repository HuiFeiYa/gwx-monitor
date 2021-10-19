export const afterLoad = callback => {
  if(document.readyState === 'complete') {
    setTimeout(()=>{
      console.log('afterLoad')
      callback()
    })
  }else{
    window.addEventListener('pageshow',()=>{
      console.log('afterLoad')
      callback()
    })
  }
}

export const beforeUnload = callback => {
  window.addEventListener('beforeunload', ()=>{
    console.log('beforeUnload')
    callback()
  })
}
export const unload = callback => {
  window.addEventListener('unload', ()=>{
    console.log('unload')
    callback()
  })
}