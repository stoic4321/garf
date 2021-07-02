import {safeSplitNoBlank, safeIth, trimAll,noBlanks,splitTrim, makeDoFnOnEachFn} from '../../helpers/array'
import {digTreeList} from '../../helpers/digTreeOne'

//----/////////------------------------------------
const parseImp = (imp) => {
  let imps
  // imps = imp.replace(/\)[\s\n]*if/gm,').\nif').split(/\s*\./g)
  imps = imp
    .replace(/\/\/[ \t$\w.]*/g,'')     // remove trailing // comments
    .replace(/\)[\s\n]*if/gm,').\nif') // fix ifs without .s
    .split(/\)[\s\n]*\./gm)            // split on ). (even with whitespace)
  // console.log(JSON.stringify(imps))
  return (
  imps.map((x) => {
    const ret = noBlanks(x.trim().split(/[()]/))
    if (ret && ret.length>0) ret[0] = ret[0].replace(/^\./,'')
    //ctr +=1
    // if((ctr>=8)&&(ctr<=20))
    // console.log(ctr+' parseImp=',ret.map(x=>x.replace(/[\n\s]+/gm,'')))
    return ret
  })
)}
//----//////////------------------------------------
const parentArr = (struc) => {
  let arr = [struc]
  while(struc.parent){ arr.push(struc = struc.parent()) }
  return arr
}
//----////////////--------------------------
export const parsePicker = (pkr) => { // EX: PickEnum(Yes,No)>>heart
  if ((!pkr) || (pkr=='')) return [null,null,null]
  // console.log(pkr)
  const [main,tag] = pkr.split('>>')
  if (main==='') return [null,null,tag]
  const [verb,list] = main.split(/[()]+/)
  return [verb, safeSplitNoBlank(list,','), tag]
}
//----///////////--------------------------
export const prepPicker = (struc, store) => {
  let pts = store.pickerTags ||= {}
  if (!struc.picker) return
  const [verb,list,tag] = parsePicker(struc.picker)
  // console.log('[verb,list,tag]=',[verb,list,tag])
  if (tag) {
    if (verb) pts[tag] = [struc, ...(pts[tag] || []) ]
    else      pts[tag] = [...(pts[tag] || []), struc ]
  }
}
//----//////////////////------------------------------------
const matchAncestorPick = (struc, val, flavor) => {
  // if (struc.id==23) console.log({x:`${flavor||''}_${val}`, 
    // p1:struc.ancPicks,p2:struc.ancFlavPicks, val, flavor})
  if (val==='*') {
    return  !(
      struc.ancPicks.includes('None') ||
      struc.ancPicks.includes('Never') ||
      struc.ancPicks.includes('0')     || struc.ancPicks.includes(0)     ||
      struc.ancPicks.includes('false') || struc.ancPicks.includes(false)
    )
  }
  else return (flavor) ?
    struc.ancFlavPicks.includes(`${flavor||''}_${val}`) :
    struc.ancPicks.includes(val)
}

const calcIf = (ifParams, struc, verb, store) => {
  // If any of the params match the picks of self or ancestors with the right flavor
  const flavorToMatch = safeIth(verb,2,x=>x.toLowerCase()) // grabs the X in ifX()
  let gotMatch = false
  if (ifParams) {
    const pms = splitTrim(ifParams, ',')
    if (flavorToMatch=='s') { // it's an ifStruc()!, NOT a ifCond(), ifAct(), ifRisk()
      const [strucHandle, pickedValToMatch] = pms
      const struc = store.handles[strucHandle]
      const pickOfStruc = struc?.pick?.[1] + ''
      gotMatch = (pickedValToMatch!=undefined) && (pickOfStruc == (pickedValToMatch+''))
      // console.log('CALC IF',{gotMatch,'pickOfStruc':pickOfStruc, pickedValToMatch})
    } else {
      pms.some( (p) => { // some() is akin to forEach(), but returning true breaks the loop
        gotMatch ||= matchAncestorPick(struc, p, flavorToMatch)
        return gotMatch // this will break the loop as soon as a match is found since we called some()
      })
    }
  }
  return gotMatch
}
//----//////////--------------------------------
const safeFloat = (x, def=null, cmd='?') => {
  const x_f = parseFloat(x)
  if (isNaN(x_f)) {
    addErr(`Number expected for ${cmd}`);
    return def
  }
  else { return x_f }
}
//----//////////////----------------------------
const nudgeOrSetVar = (k, newVRaw, verb, params, store) => {
  const cmdStr = `${verb}(${params})`
  if (!newVRaw) {addErr(cmdStr+' bad value'); return}
  newVRaw += '' // ensure a string
  const oldV = store.vars[k] || 0
  const newV = (newVRaw+'').replace('%','')
  const isPercent = (newVRaw.length !== newV.length)
  const newV_f = safeFloat(newV,null, `${cmdStr}: should look like 6, +5, -2, 3%, -7%, or +4%`)
  const hasSign = (newV.startsWith('-') || newV.startsWith('+'))
  if (isNaN(newV_f)) {
    addErr(`bad number for ${verb}(${params})`)
    return
  }
  if (isPercent) {
    const percentOfOld = (newV_f/100.0) * oldV
    store.vars[k] = (hasSign) ? (oldV + percentOfOld)    : percentOfOld
  } else {
    store.vars[k] = (hasSign) ? (oldV + newV_f)          : newV_f
  }
  // const cmd = `set(${k}, ${newVRaw}) --->  ${k} = ${store.vars[k]}`
  // console.log('nudgeOrSetVar.'+cmd)
  return store
} // Usage
// nudgeOrSetVar('$life',      '5.0', '1.')
// nudgeOrSetVar('$life',    '+7', '2.')
// nudgeOrSetVar('$life',    '25%', '3.')
// nudgeOrSetVar('$life', '-50%', '4.')
//----///////------------------
const setVar=(verb, pms, eqn=(x=>x), store)=>{
  // console.log('set',pms)
  const ps = (pms) && splitTrim(pms, ',')
  if (ps && ps.length>1) {
    const [key,val] = ps
    nudgeOrSetVar(key, eqn(val), verb, pms, store)
  } else {
    addErr(`Problem parsing ${verb}(${pms}) Params should be ($varName,a_value)`)
  }
}
//----///////////////------------------------------------
const storeTaggedImp = (currTag,compO,store) => {
  if (currTag) {
    store.taggedImps ||= {}
    store.taggedImps[currTag] = [...(store.taggedImps[currTag]||[]), compO] // console.log(currTag, compO.parts)
    compO.tag = currTag
  }
}
//----//////////------------------------------------
const alterImps = (tag, fn, store) =>{
  // console.log(params.trim(), 'store[params.trim()]=', taggedImps )
  const taggedImps = store.taggedImps[tag]
  if (!taggedImps) {
    addErr(`tag not found in: ${cmdStr}`)
    return false
  } else{
    taggedImps.forEach( fn )
    // console.log('alterImps().taggedImps=',taggedImps)
    return true
  }
}
//----///////////------------------------------------
const digTaggedSays = (store, tag) => (store.taggedImps[tag] || []) 
//----///////////------------------------------------
const styleThing = (struc, store, tag, style) => { // if no tag, use the struc, if #tag, use the imps of that #tag
  const hasTagParam = (!!tag)
  const styleTargs = (hasTagParam) ? digTaggedSays(store, tag)  :  [struc]
  styleTargs.forEach((x) => x.style = {...x.style, ...style}) // add passed styles to current ones
}
//----///////////////------------------------------------
const showOrHideThing = (shown, struc, store, params, stl) => {
  const isStruc = !params // blank params means struc, not tagged sayItems
  // console.log('----showOrHideThing()', {params, isStruc})
  let things = (isStruc) ? [struc] : digTaggedSays(store, params) 
  things.forEach((x) => {
    // x.style = {...x.style, ...stl}
    x.shown = shown
  })
}
//----///////------------------------------------
const runImp = (impRaw, struc, impComps, store) => {
  const imps = parseImp(impRaw)
  let ifResult = true
  // let saysOfCurrIf = []
  let currTag = null
  let rank = null
  store.vars = store.vars || {} // console.log('store=',store)
  const addErr    = (str) => {store.err     = [...(store.err||[]), str]; console.log('%c'+str,'color:white;background:red;padding:2px')}
  const addSumImp = (si)  => store.sumImps = [...(store.sumImps||[]), si]
  const mergeVar  = (k,v) => store.vars   = {...(store.vars||[]), [k]:v}
  //----//////////-------------------
  const impCompOs = noBlanks(imps).map((impParts,i) => {
    const [verb, params] = trimAll(impParts)
    const cmdStr = `${verb}(${params||''}) on id:${struc.id}`
    let CompForVerb = impComps[verb] || impComps.Raw
    const plainIf = verb.replace('and','').replace('or','').replace('If','if')
    const isIfCmd = plainIf.startsWith('if')// || plainIf.startsWith('andIf') || plainIf.startsWith('orIf')
    //console.log( '[verb, params]', [verb, params] )
    const alterStruc = (struc, fn) => {
      fn(struc)//.style = {...(struc.style||{}), ...style}
    }
    let compO = {
      comp: CompForVerb,  key:`imp_${i}_${struc.id}`,
      tf:   ifResult,   parts:impParts, baseVerb: verb, tag: currTag
    }
    //---////////--------------------------
    if ( isIfCmd ) {
      const calcedIf = calcIf(params, struc, plainIf, store)
      if ( verb.startsWith("andIf") ) ifResult &&= calcedIf
      if ( verb.startsWith("orIf")  ) ifResult ||= calcedIf
      if ( verb.startsWith("if")  )  {
        ifResult = calcedIf
        currTag = null // clear tag for new section. TODO: Maybe not?
      }
      return compO = {...compO, comp: impComps.if, tf: ifResult, baseVerb:'if'}
    }
    //-----------------///////--------------------------
    else if (verb === "sumRank") {
      rank = safeFloat(params, 0, cmdStr)
      return compO
    }
    //----------------//////--------------------------
    else if (verb === "set") {
      if (ifResult) setVar(verb, params, undefined, store) // only run setVar() when below a true if() block
      return compO
    }
    //-----------------//////--------------------------
    else if (verb === "setRR") { // EX: .setRR($boo, 1.34) Risk Reduction
      const asRiskReduction = (x) =>{
        const x_f = safeFloat(x, null, cmdStr)
        if (isNaN(x_f)) addErr(`Number expected for: ${cmdStr})`)
        return (x_f) ? `${( 1.0 / x_f)*100.0}%` : null
      }
      if (ifResult) setVar( verb, params, asRiskReduction, store )
      return compO
    }
    //-----------------//////--------------------------
    else if (verb === "sumSay") { // EX: .sumSay(Amputation)
      storeTaggedImp(currTag,compO,store)
      addSumImp({...compO, rank})
      return compO
    }
    //---------------//////--------------------------
    else if (verb === "say") { // EX: .say(Loss of limb)
      storeTaggedImp(currTag,compO,store)
      // if (currTag) {
      //   store[currTag] = [...(store[currTag]||[]), compO] // console.log(currTag, compO.parts)
      //   compO.tag = currTag
      // }
      // saysOfCurrIf.push(compO)
      return compO
    }
    //-----------------//////--------------------------
    else if (verb === "strike") { // EX: .strike(#scary_ones)
      if (ifResult) {
        alterImps( params, 
          (x) => {
            x.style = {textDecoration:'line-through', ...x.style}
          }, 
          store 
        )
      }
      return compO
    }
    //----------------//////--------------------------
    else if (verb === "show") { // EX: .show() or .show(#happy_ones)
      // for strucs .show() will hide the struc itself
      // for tagged ones .show(#fun_one) will hide .tag()ged .say() items
      if (ifResult) {
        const stl =  (!params) ? {background:'#dff', color:'black'} : {background:'#ffd', color:'black'}   
        showOrHideThing(true, struc, store, params, stl)
        return compO
      }
    }
    //----------------//////--------------------------
    else if (verb === "hide") { // EX: .hide() or .hide(#scary_ones)
      if (ifResult) {
        const stl =  (!params) ? {background:'#225', color:'grey'} : {background:'#444', color:'white'}
        showOrHideThing(false, struc, store, params, stl)
      }
      return compO
    }
    //----------------//////--------------------------
    else if (verb === "tag") { // EX:  .tag(#scary_ones)
      //if (store[params]) addErr(`tag already exists .${cmdStr} Effected says: ${JSON.stringify(store[params])}`)
      //store[params]=[]
      currTag = params
      // store[params] = saysOfCurrIf // console.log(cmdStr + ' | store=',store)
      return compO
    }
    //----------//////--------------------------
    else if (CompForVerb) {
      //TODO if (CompForVerb === comps.Raw) addErr(`Unknown himp cmd ${cmdStr}`)
      return compO
    }
    else {
      return compO
    }
  })
  return impCompOs//[impRet, store]
}
//----//////////----------------------------
export const prepStruc = (struc, jours, comps, store) => {
  // console.log('prepStruc().struc=',struc)
  // console.log('prepStruc( ).store=',store)
  const kids = struc.children
  kids && kids.forEach((k) => { k.parent = () => struc }) // a function that returns the parent (not a ref since that would make a graph loop!)
  const ancestors = parentArr(struc)
  struc.ancFlavPicks = ancestors.map(x=>`${x.flavor && x.flavor[0]}_${x.pick && x.pick[1]}`)
  struc.ancPicks     = ancestors.map(x=>`${x.pick&&x.pick[1]}`)
  struc.shown        = true
  struc.impCompOs    = (struc.impacts && runImp(struc.impacts, struc, comps, store)) || []
  if (typeof struc.data == 'string') struc.data = JSON.parse(struc.data)
  // console.log("HIMP", struc.impacts, struc.impCompOs)
  prepPicker(struc, store)
  // console.log('ancFlavPicks=',JSON.stringify(struc.ancFlavPicks))
  // now recurse
  prepStrucs(struc.children, jours, comps, store)
}
//----///////////----------------------
export const prepStrucs = (strucs, jours, comps, store) =>{
  store.handles ||= {}
  digTreeList(strucs, (struc)=>{
    store.handles = {...store.handles, [struc.handle]: struc}
    const pickOfJour = jours[struc.handle]
    if (pickOfJour) {
      struc.pick = pickOfJour
      pickOfJour[3] = (() => struc) // struc.pick[3] is a fn that returns this struc
    }
  })
  return (strucs && strucs.map((s) => prepStruc(s, jours, comps, store) )) || []
}
//----////////------------------------------------
// const runImps = makeDoFnOnEachFn(runImp)

export {parseImp, runImp } //, runImps}