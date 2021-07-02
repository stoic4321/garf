const niceVar = (nm, vars, fmt='') => {
  let x = vars['$' + nm]
  if (x) x = Math.round(x*100.0)/100.0
  return x
}
export const interpolateStrings = (txt, vars) => {
  const arr = txt.split(/\{\$/).map((x, i) => (i < 0) ? x : x.split('}'))
  if (arr.length == 1)
    return txt
  else {
    // console.log(JSON.stringify(arr))
    // console.log(vars)
    const arr2 = arr.map((x) => (x.length > 1) ? (niceVar(x[0], vars) + x[1]) : x[0])
    // console.log(JSON.stringify(arr2.join('')))
    return arr2.join('')
  }
};
