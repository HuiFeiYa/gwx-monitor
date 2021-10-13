import { setupReplace } from './load';
export * from './load'
export * from './replace'
function init(options: InitOptions = {}) {
  if(!('XMLHttpRequest' in window) || options.disabled) return 
  setupReplace()
}
export {
  init
}