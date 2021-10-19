export function htmlElementAsString(target:HTMLElement) :string {
  const tagName = target.tagName.toLowerCase()
  // 判断非最外层元素时候返回 htmlstring
  if(tagName === 'body' || tagName === 'html'){
    return tagName 
  }
  let classNames = target.classList.value 
  classNames = classNames !== '' ? ` class="${classNames}" ` : ''
  const id = target.id ? ` id="${target.id}"` : ''
  const innerText = target.innerText 
  return `<${tagName}${id}${classNames !== '' ? classNames: ''}>${innerText}</${tagName}`
}

export function getWindowHeight() {
  return document.documentElement.clientHeight;
}
