import React from 'react'
import PickerFactory from '../pickers/PickerFactory'

//----//////////---------------------------------------------
// * New Styled Function
export const ActionItem = ({ item, doClick, children, jourHash }) => {
  const { name, picker } = item
  const valueArr = jourHash && jourHash[item.handle]
  // console.log(`ACTION ITEM`, valueArr)
  return (
    <div className="row m-0">
      <div className="col-spacer">{' '}</div>
      <div className="col">
        <div className="pb-2 pt-2 structure_item_action_picker">
          <PickerFactory {...{item, name, picker, onPick:doClick, valueArr}} />
        </div>
      </div>
    </div>
  )
}
