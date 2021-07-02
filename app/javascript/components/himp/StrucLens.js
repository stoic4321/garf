import React from 'react';
import { Recursor, RecursorList } from './Recursor'

//-----------||||||||||||---------------------------------------------
export const flavorLetter = (flavor) => {
  switch(flavor) {
    case 'condition'       : return 'c'
    case 'action'          : return 'a'
    case 'condition_group' : return 'g'
    case 'risk'            : return 'r'
    default                : return null
  }
}

//-----------|||||||||||||||---------------------------------------------
export const hasFlavorChild = (flav) => (x) => 
  x.children && x.children.reduce((sum, y) => y.flavor == flav || sum, false)

//-----------|||||||||---------------------------------------------
export const hasFlavor = (flav, arr) => arr.reduce((sum, x) => x.flavor == flav || sum, false)

//-----------|||||||||||||||---------------------------------------------
export const flattenChildren = (item) =>{
  const flattened = item.reduce((acc, x) => {
    acc.push(x)
    if (x.children) {
      acc = acc.concat(flattenChildren(x.children))
    }
    return acc
  }, [])
  // console.log('----flattened=',flattened)
  return flattened
}
//-----------|||||||||||||||||||---------------------------------------------
export const hasFlavorDescendent = (flav, item) => hasFlavor(flav, flattenChildren([item]))
//-----------|||||||||||||||||||---------------------------------------------
export const hasAncestorByKeyRegx = (item, key, valRegx) => {
  let hasIt = false
  let curr = item.parent()
  while (curr && !(hasIt = (curr[key].match(valRegx))) ) {curr = curr.parent()}
  return hasIt
}
//-----------||||||||||||||||||//---------------------------------------------
export const findStrucByKeyRegx = (item, key, valRegx) => {
  if (typeof valRegx == 'string') valRegx = new RegExp(valRegx)
  const st = flattenChildren(item).filter(x=>(x[key].match(valRegx)))
  return (st && st.length > 0 && st[0]) || []
}
//-----------||||||||||||||||||//---------------------------------------------
export const findStrucsByParentKeyRegx = (item, key, valRegx) => {
  if (typeof valRegx == 'string') valRegx = new RegExp(valRegx)
  const sts = flattenChildren(item).filter(x=>(x?.parent?.()?.[key]?.match(valRegx)))
  return sts || []
}
//-----------||||||||||||||||||//---------------------------------------------
export const findStrucByName = (name, item) => {
  return findStrucByKeyRegx(item,'name',name)
  // const st = flattenChildren(item).filter(x=>(x.name===name))
  // return (st && st.length > 0 && st[0]) || []
}
//-----------|||||||||||||||||---------------------------------------------
export const findStrucByHandle = (handle, item, key) => {
  return findStrucByKeyRegx(item,'handle',handle)
  // const st = flattenChildren(item).filter(x=>(x.handle===handle))
  // return (st && st.length > 0 && st[0]) || []
}
//-----------|||||||||---------------------------------------------
export const StrucLens = ({ list, item, ...bind }) => {
  if (list) return <RecursorList {...{ list, ...bind }} />
  return           <Recursor     {...{ item, ...bind }} />
}
//-----------||||||||||||||||||||---------------------------------------------
export const StrucLensByKeyToComp = (key,valRegx,Comp) => ({...bind}) => {
  if (typeof valRegx == 'string') valRegx = new RegExp(valRegx)
  const compFinder = (item) => (
    (item[key].match(valRegx)) ? [Comp,null,null] : [null,null,null]
  )
  return <StrucLens {...{compFinder, ...bind}}/>
}

