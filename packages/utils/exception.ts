// 原生 try 函数，包装成接受两个函数的作为参数的函数
export function nativeTryCatch(fn:()=> void, errorFn?:(err:unknown)=> void){
  try {
    fn()
  } catch (error) {
    console.log(error)
    typeof errorFn === 'function' && errorFn(error) 
  }
}