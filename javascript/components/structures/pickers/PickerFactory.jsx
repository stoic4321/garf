import React from 'react'
import Pick from './Pick'
import {PickPipes,PickPipesNameUnder,PickPipesNameOver} from './PickPipes'
import PickBool from './PickBool'
import PickDot from './PickDot'
import PickSwitch from './PickSwitch'
import {PickIntegerLoBad, PickIntegerHiBad} from './PickInteger'
import PickSeverity from './PickSeverity'
import PickBloodPressure from './PickBloodPressure'
import { parsePickerStr } from './parsePickerStr'

const Group = ()=>(null)
export const pickerComps = {
  Pick,
  PickBool,
  PickSwitch,
  PickDot,
  PickIntegerLoBad,
  PickIntegerHiBad,
  PickInteger: PickIntegerHiBad,
  PickSeverity,
  PickBloodPressure,
  Group,
  PickPipes,
  PickPipesNameUnder,
  PickPipesNameOver,
}
//----------------------//////////////---------------------------------
export default function PickerFactory({ picker, item, onPick, name, valueArr, index }) {  
  const pkrHsh = parsePickerStr(picker, pickerComps)
  let PickComp = (pkrHsh && pkrHsh.Comp) || Pick
  const bind = {item, onPick, name, valueArr, index}
  return (
    (pkrHsh) ?
      <PickComp enums={pkrHsh.params} {...bind} />
      :
      <div>{'Err: '+picker}</div>

  )
}
