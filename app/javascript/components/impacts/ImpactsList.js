import React from 'react'
import { StrucLens, flavorLetter, hasFlavorChild, hasFlavor, hasFlavorDescendent, flattenChildren } from '../himp/StrucLens'
import { interpolateStrings } from '../himp/interpolateStrings'
import { digOrDefault } from "../../helpers/digOrDefault"

const countTrueImps = (item) => (item.impCompOs && item.impCompOs.filter(it=>it.tf).length) || 0

const CondStruc = ({item, children, jourHash}) => {
  // console.log('jourHash[item.handle]=',jourHash[item.handle])
  return( (jourHash[item.handle] && jourHash[item.handle][1]) ?
    <div className="mb-5">
      <b>{item.name}</b>
      {children}
    </div>
    : 
    null
  )
}
const BulletSay = ({parts,tf,store}) => {
  let txt = interpolateStrings(parts[1], store.vars)
  const isMarky = (txt[0]=='\n' || txt[0]=='\r' ) // starts w newline for Markdown
  // const isMine = txt.includes('=')
  if (isMarky) txt = txt.replace(/<.+>/g,'').trim()
  // if (isMine) console.log(`BulletSay.txt='${txt.replace('\n','\\n')}', isMarky=${isMarky}, txt[0]=${txt[0]==='\n'}`)
  if (txt.replace(/\s/g,'')=='') return null // if empty except for whitespace, bail out
  tf = (tf) ? ' ✓' : ' 𐄂'
  return (
    <div className="py-2 d-flex align-items-center">
      <span className="pr-1 bullet_say__bullet">•</span>
      {/* <span className="bullet_say__text">{txt + tf}</span> */}
      <span className="bullet_say__text">{txt}</span>
    </div>
  )
}
const impComps = {
  if:null,//({parts})=>(<div>if({parts[1]})</div>),
  //say:({parts,tf})=>(<li className="p-1" style={{textDecoration:(tf?'underline':'line-through')}}>{parts[1]}</li>),
  say:BulletSay,
}

const Impacts = ({item, store, impComps}) => (item.impCompOs && item.impCompOs.map((ico)=>{
  let Comp = digOrDefault(impComps, ico.baseVerb, ico.comp)
  // console.log({x:'IMPACTS=',store, verb:ico.baseVerb,ico,impComps, Comp})
  return (
    (ico.tf && Comp && <Comp {...{...ico, store, impComps}}/>) || null
  )
})) || null

const RiskStruc = ({item, doClick, store, jourHash, children, ...moreBind}) => {
  return( (countTrueImps(item)>0) ?
    <div className="structure_item_risk__impacts">
      <b>{item.name}</b>
      <span className=""> risk</span>
      <Impacts {...{item, store, impComps}} />
    </div>
    : null
  )
}
//----//////////----------------------------------------------------------------
const compFinder = (item) => {
  const hasRiskChild  = hasFlavorDescendent('risk',item)
  const kind = flavorLetter(item.flavor)
  const isGroup = (kind == 'g') && hasRiskChild
  const isCond  = (kind == 'c') && hasRiskChild
  // if (isGroup)     return [GroupStruc, null,     null   ]
  if (isCond)      return [CondStruc,  null,     null   ]
  if (kind == 'r') return [RiskStruc,  null,     null   ]
  else             return [null,       null,     null   ]
  //                      [OneComp,    ListComp, OneWrap]   // called with: const [OneComp, ListComp, OneWrap] = compFinder(item)
}
//----///////////----------------------------------------------------------------
const ImpactsList = ({ structures, doClick, ...bind }) => {
  // console.log("Impacts LIST", structures)
  return (
    <div className='structures__scroll-box pl-2 pr-1 box-content'>
      <StrucLens {...{list:structures, doClick, compFinder, ...bind}}/>
    </div>
  )
}
export default ImpactsList
