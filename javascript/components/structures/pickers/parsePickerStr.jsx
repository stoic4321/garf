
const safeSplit = (splitter, s) => (s.includes(splitter)) ? s.split(splitter) : null

// PickInteger(0,8)>>setAll(+20)
// PickInteger(0,8)>>setSevere(+20)
// PickInteger(0,8)>>setMild(*1.20)

export const parsePickerStr = (p, comps) => {
  // console.log("PARSE PKR STR", p, comps)
  if (!p) return null;
  if (!p.includes(')')) return null;
  const funcs = safeSplit('>>', p)
  if (funcs && funcs.length>1) {
    return {
      ...parsePickerStr(funcs[0], comps), // merge parsed func left of ">>"
      actionFn: parsePickerStr(funcs[1], comps) // with parsed fun right of ">>" (but under the sub-key, actionFn)
    }
  }
  let ret = null, comp;
  // try {
  const [compStr, ...rest] = p.split('('), // compStr is component name
  paramsStr = (rest.length > 0) && rest[0].slice(0, -1); // paramStr is the parameters with tailing ")" removed
  const params = ((paramsStr) && paramsStr.split(',')) || [];
  comp = comps[compStr];
  // } catch(e) { }
  ret = (comp) ? { Comp: comp, params } : null;
  // console.log('parsePickerStr()', {p, compStr, paramsStr, rest, ret} );
  return ret;
};
