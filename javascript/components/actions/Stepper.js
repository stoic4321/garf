import React, { useState } from 'react'
import strikeAPose from '../../helpers/strikeAPose'
import { GroupItem } from '../structures/items/GroupItem'
import { ConditionForActionItem } from '../structures/items/ConditionForActionItem'
import { RiskItem } from '../structures/items/RiskItem'
import { ActionItem } from '../structures/items/ActionItem'
import { StrucLens, flavorLetter, hasFlavorChild, hasFlavor, hasFlavorDescendent, flattenChildren } from '../himp/StrucLens'
import { digTreeOne, digTreeList } from '../../helpers/digTreeOne'

//----/////////----------------------------------------------------------------
const Progress = ({stepIdx,numSteps,setStepIdx}) => (
  <div className="d-inline mr-4 stepper-panel__progress">
    <span className="mr-4 word">Progress</span>
    {Array(numSteps).fill(0).map((x,i)=>(
      <span className="p-1 cursor" onClick={()=>setStepIdx(i)} key={i}>
        <span className={`dot ${(stepIdx==i)?'active':''}`}></span>
      </span>
      ))}
  </div>
)
//----////////----------------------------------------------------------------
const Scrolly = ({children}) => (
  <div className='structures__scroll-box box-content'>
    {children}
  </div>
)
//----//////////----------------------------------------------------------------
const NonWrap = ()=> ({children}) => (<>{children}</>)
const ColorWrap = (color, w=2) => ({children}) => <div style={{border:`solid ${w}px ${color}`}}>{children}</div>
const ColorWrapOk = NonWrap//(color, w=2) => ColorWrap('#efefef', 0.1)//w) // ColorWrap(color, w)
const ListWrap = ({children}) => <div style={{border:'solid 2px red'}}>{children}</div>
const PanelHiderWrap  = ({active, children}) => (
  <div className={`box-content ${active ? 'd-block' : 'd-none'} print-all`}>
  {children}
</div>)
//----//////////----------------------------------------------------------------
const compFinder = (item) => {
  const hasRiskChild  = hasFlavorChild('risk')(item)
  const kind = flavorLetter(item.flavor)
  if (kind == 'g'                      ) return [null,null,PanelHiderWrap]//[GroupItem,              ColorWrapOk('lime'),    PanelHiderWrap]
  if (kind == 'c' && hasRiskChild      ) return [ConditionForActionItem, Scrolly,                PanelHiderWrap]
  if (kind == 'r'                      ) return [RiskItem,               ColorWrapOk('orange'),  ColorWrapOk('yellow')]
  if (kind == 'a'                      ) return [ActionItem,             ColorWrapOk('cyan'),    ColorWrapOk('green')]
  return [null,    ColorWrap('red',5), ColorWrap('magenta',5)]
  //     [OneComp, ListComp,           OneWrap]   // called with: const [OneComp, ListComp, OneWrap] = compFinder(item)
}
//----/////////////----------------------------------------------------------------
const StepperPanel = ({...bind}) => (
  <StrucLens {...{compFinder, ...bind}}/>
)
const justRiskParents = (list) => {
  let arr = []
  digTreeList(list, (x)=>{
    const par = x.parent && x.parent()
    const yep = x.flavor=='risk' && par && par.shown
    if (yep) arr.push(par)
  })
  return [...new Set(arr)] // de-duplicate
}
//----------------------////////------------------------------------------
export default function Stepper({ mode, setMode, structures, store, jourHash, setJourVal }) {
  // console.log('Stepper Struct', structures)
  const riskParents = justRiskParents(structures)
  const [stepIdx, setStepIdx] = React.useState(0)
  const numSteps = riskParents.length
  const nudgePanel = (x) => setStepIdx( Math.min(Math.max(0, (stepIdx + x)), numSteps - 1) )
  const clickSave  = (x) => setMode('j')
  const onLastPanel = (stepIdx < numSteps-1)
  //----////////------
  const doClick = (ev, item, name, val, idx) => {
    // console.log("DO CLICK HASH", item.data)
    // console.log("DO CLICK", ev, item, name, val, idx)
    const hash = item && item.data
    // console.log("HASH" , hash)
    hash && strikeAPose(hash.pose3D)
    if (val != undefined) {
      // console.log("VALUE PICKED", { item, clickValue: ev && ev.target && ev.target.value })
      setJourVal && setJourVal(item.handle, [name, val, idx])
    }
  }
  // console.log('STEPPER', justRiskParents(structures).map(x=>`${x.flavor}: ${x.name}`))
  const bind = { mode, jourHash, setJourVal }
  const stepperBind = {doClick, store, ...bind}
  //===========<Stepper/>===============
  return (
    <div className="box">
      {riskParents.map((item, idx) => (
        <StepperPanel {...{item, idx, key:idx, active:(idx==stepIdx), ...stepperBind}}/>
      ))}
      <div className="ml-5 mt-3 box-footer">
        <Progress {...{stepIdx, numSteps, setStepIdx}} />
        <div className="d-inline float-right">
          {(stepIdx>0) &&
            <button className='btn btn-secondary mr-3' style={{color:'white'}}
            onClick={(e) => { nudgePanel( -1 ) }}
            >
              {'<< Previous'}
            </button>
          }
          {(onLastPanel)
            ?
            <button className='btn btn-primary d-inline' style={{color:'white'}}
              onClick={(e) => { nudgePanel( +1 ) }}
            >
              {'Next >>'}
            </button>
            :
            <button className='btn btn-success d-inline' style={{color:'white'}}
              onClick={(e) => { clickSave(e) }}
            >
              Save...
            </button>
          }
        </div>
      </div>
    </div>
  )
}
