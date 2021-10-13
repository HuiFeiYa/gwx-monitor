
export function addReplaceHandler(hanlder:ReplaceHanlder){
  replace(hanlder.type)
}

function domReplace() {

}

function replace(type:EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.DOM:
      domReplace()
      break;
  }
}