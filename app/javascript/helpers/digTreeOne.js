
export const digTreeOne = (one, fn, kidKeyNm='children') => {
  one && fn(one);
  one && one[kidKeyNm] && digTreeList(one[kidKeyNm], fn);
}

export const digTreeList = (list, fn) => (list.forEach(x=>digTreeOne(x,fn)))

// Usage: --------
// Give: [{ flavor:'group', children:[
//          {flavor:'risk'}, 
//          {flavor:'ick'}]} ]
// },{}]
// let arr = []
// digTreeList(list, (x)=>{
//   const yep = x.flavor=='risk'
//   if (yep) arr.push(par)
// })