export function htmlElementAsString(target:HTMLElement) :string {
  const tagName = target.tagName.toLowerCase()
  if(tagName === 'body'){
    return '' 
  }
  let classNames = target.classList.value 
  classNames = classNames !== '' ? ` class="${classNames}" ` : ''
  const id = target.id ? ` id="${target.id}"` : ''
  const innerText = target.innerText 
  return `<${tagName}${id}${classNames !== '' ? classNames: ''}>${innerText}</${tagName}`
}