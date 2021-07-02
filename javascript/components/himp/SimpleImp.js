import { Marky } from '../Marky';
import React from 'react';


const tfStr = (tf) => (tf) ? "T" : "F"

export const SimpleImp =({tf,parts,stl={},elType='d',style}) => {
  if (!parts || (typeof parts === 'string') ) {
    parts = [parts]
  }
  // const txt = `${tfStr(tf)}: ${parts.join('(')})`
  const isIf = parts && ((parts[0].startsWith('if')) || (parts[0].startsWith('andIf')|| (parts[0].startsWith('orIf'))) )
  const cmd0 = parts.join('(')
  const cmd = cmd0.includes('(') ? cmd0+')' : cmd0 + '()'
  // console.log('0',JSON.stringify(parts))
  // console.log('1',parts[0])
  // console.log('2',parts.join('('))
  let txt = (isIf) ?
    `${parts.join('(')})` :
    `└${tfStr(tf)}:${cmd}`.replace(/:"/,':').replace(/"$/,'')
  stl = {fontFamily:'monospace',margin:0, ...stl}
  stl = {...stl, ...((tf)?({color:'green'}):({color:'red'}))}
  if (elType==='s') stl = {display:'inline',...stl}
  if (!isIf) {
    stl = {borderLeft:'1px solid grey',...stl, marginLeft:10, paddingLeft:10 }
  } else {stl = {...stl, borderTop:'1px solid grey', borderLeft:'1px solid grey'}}
  return <pre style={{...stl, ...style}}>{txt}</pre>
}