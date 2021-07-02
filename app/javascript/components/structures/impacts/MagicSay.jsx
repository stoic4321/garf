import React from 'react';
import { Marky } from '../../Marky';
import { interpolateStrings } from '../../himp/interpolateStrings'
import {GaugeChartCols} from '../../GaugeChart'

//-----------||||||||--------------------------------------------
export const MagicSay = ({ parts, tf, store, style, tag, markyComps }) => {
  const isMkDn = parts[1].includes('\n')
  const txt = interpolateStrings( parts[1], store.vars )
  const markComps = {...markyComps, GaugeChart:GaugeChartCols}
  return (
    (isMkDn) ?
    <Marky txt={txt}  compsO={markComps}/>
    :
    <div className="row m-0">
      <div className={`col-spacer`}>{' '}</div>
      <div className={`col`}>
        <li className="" style={style}>
          {txt}
          <span style={{ fontSize:'70%', color: (tf) ? '#50a05080' : '#a0505080' }}>
            {(tf) ? ' ✓ ' : ' 𐄂 '}
          </span>
          {tag && <span style={{ fontSize:'70%', color: '#ccc' }}>
            {' '+tag}
          </span>}
        </li>
      </div>
    </div>
  )
}
//-----------||||||||||||||||----------------------------------------------
export const FilteredMagicSay = ({isMatchFn=((x)=>true), ...props}) => (
  (isMatchFn(props)) ? <MagicSay {...props} /> : null
)
//-----------||||||||||||||||||||||----------------------------------------
export const genFilterByTagMagicSayComp = (tagRegx) => (props) => (
  <FilteredMagicSay {...props} 
    isMatchFn={x=>{
      // console.log( tagRegx, x, (x.tag && x.tag.match(tagRegx)))
      return (x.tag && x.tag.match(tagRegx))
    }}     
  />
)
