import React from 'react'
import PickerFactory from '../pickers/PickerFactory'

//-----------//////////////---------------------------------------------
export const NameUnderItem = ({ item, doClick, jourHash }) => {
  // console.log(`-----NameUnderItem`, {item})
  const { name, picker } = item
  const valueArr = jourHash && jourHash[item.handle]
  return (
    <div className="">
      <PickerFactory
        name={name}
        picker={picker}
        onPick={doClick}
        item={item}
        valueArr={valueArr}
        />
        <p className=''>{item.name}</p>
    </div>
  )
}

