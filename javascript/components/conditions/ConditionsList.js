import React from 'react'
import { StrucLens, flavorLetter, hasFlavorChild, hasFlavor, hasFlavorDescendent, flattenChildren } from '../himp/StrucLens'
import PickerFactory from '../structures/pickers/PickerFactory'
import strikeAPose from '../../helpers/strikeAPose'

const ConditionRadio = ({item,doClick, idx, jourHash, ...moreBind}) => {
  // console.log('COND RADIO',{item, valArr:jourHash[item.handle]})
  const {name,picker,id} = item
  const valueArr = jourHash[item.handle]
  const bind = { item, name, picker, onPick:doClick, valueArr, ...moreBind}
  return(
    <div className='pb-2' key={`cond_radio_${item.id}_${idx}`} style={{...item.style}}>
        <PickerFactory {...bind}/>
    </div>
  )
}
const HorizLine = () => (<div className="my-4" style={{height:1,backgroundColor:'grey'}}>{' '}</div>)
const ColorWrap = (color, w=2) => ({children}) => <div style={{border:`solid ${w}px ${color}`}}>{children}</div>
const ColorWrapOk = (color, w=2) => ColorWrap('#efefef', 0.1)//w) // ColorWrap(color, w)
//----//////////----------------------------------------------------------------
const compFinder = (item) => {
  if (!item.active) return [null,null,null]
  const hasRiskChild  = hasFlavorChild('risk')(item)
  const kind = flavorLetter(item.flavor)
  if (kind == 'c' && (hasRiskChild || (item.picker?.includes('>>'))))
        return [ConditionRadio, null,     null   ]
  if (item.picker == 'Line()')
        return [HorizLine, null,     null   ]
  else  return [null,           null,     null   ]
  //           [OneComp,        ListComp, OneWrap]   // called with: const [OneComp, ListComp, OneWrap] = compFinder(item)
}
//------------/////////////----------------------------------------------------------------
export const ConditionsList = ({structures, setJourVal, ...bind}) => {

  //----////////------
  const doClick = (ev, item, name, val, idx) => {
    // console.log("DO CLICK HASH", item.data)
    // console.log("DO CLICK", ev, item, name, val, idx)
    const hash = item && item.data
    console.log("HASH" , typeof hash, hash)
    hash && strikeAPose(hash.pose3D)
    if (val != undefined) {
      // console.log("VALUE PICKED", { item, clickValue: ev && ev.target && ev.target.value })
      setJourVal && setJourVal(item.handle, [name, val, idx])
    }
  }
  // const bind = { mode, jourHash, setJourVal }
  return (
    <div className="mt-3 ml-3">
      <StrucLens {...{list:structures, doClick, compFinder, ...bind}}/>
    </div>
  )
}
