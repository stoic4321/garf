import React from 'react';
import GaugeChart from '../../GaugeChart'
import { rnd } from '../../../helpers/rnd'
import { MagicSay } from '../impacts/MagicSay';
import { Impacts } from '../impacts/Impacts';

const MagicIf = ({parts,tf})=>(<code style={{ color: (tf) ? '#5a5' : '#a55' }}>.if( {parts[1]} )</code>)
const impComps = {
  say: MagicSay,
  if:null,
  // if:  MagicIf,
}
//-----------/////////---------------------------------------------
export const RiskItem = ({ item, doClick, store, children }) => {
  const { id, name, text, depth, data } = item
  // console.log("RISK ITEM", item.impCompOs)
  return (
    <div className='risk_item' onClick={(ev)=>doClick(ev, item, item.name)}>
      <div className="row m-0">
        <div className="col-spacer">{' '}</div>
        <div className="col">
          <h4 className='d-inline'>{name}</h4>
          <span className='d-inline ml-1' style={{color:'#ccc'}}> risk</span>
        </div>
      </div>
      <div className="structure_item_risk__impacts">
        <Impacts {...{item, store, impComps}} /> 
      </div>
      {children}
    </div>
  )
}
