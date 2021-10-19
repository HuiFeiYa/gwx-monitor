export const afterLoad = callback => {
  if(document.readyState === 'complete') {
    setTimeout(callback)
  }else{
    window.addEventListener('pageshow',callback)
  }
}

export const beforeUnload = callback => {
  window.addEventListener('beforeunload', callback)
}
export const unload = callback => {
  window.addEventListener('unload', callback)
}