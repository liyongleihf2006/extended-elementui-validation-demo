export default function(value){
  if(Object.prototype.toString.call(value)==='[object String]'){
    return value.trim()
  }
  return value
}