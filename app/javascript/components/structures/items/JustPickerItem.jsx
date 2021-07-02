import React from 'react'
import PickerFactory from '../pickers/PickerFactory'

//-----------//////////////---------------------------------------------
export const JustPickerItem = ({ item, doClick, jourHash, decorateValFn }) => {
  const { name, picker } = item
  const valueArr = jourHash && jourHash[item.handle]
  return (
    <PickerFactory
      name={name}
      picker={picker}
      onPick={doClick}
      item={item}
      valueArr={valueArr}
      decorateValFn={decorateValFn}
    />
  )
}

