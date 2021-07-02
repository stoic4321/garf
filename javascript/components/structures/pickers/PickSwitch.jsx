import React from 'react'

const PickSwitch = ({ name, item, onPick, indexPicked, valueArr, index }) => {
  const switchTagId = `pickSwitch-${name}-${index}`
  valueArr = valueArr||[item.name, false, 0]

  // console.log('PickSwitch=',{valueArr})
  const chgIt = (ev) => {
    // console.log('ev, name, ev.target.checked', ev, name, ev.target.checked)
    onPick(ev, item, name, ev.target.checked)
  }
  return (
      <div
        className="custom-control custom-switch custom-switch-lg d-inline"
        style={{}}
      >
        <input
          type="checkbox"
          className="custom-control-input cursor-pointer"
          id={switchTagId}
          onChange={chgIt}
          checked={valueArr[1]||false}
        />
        <label className="custom-control-label cursor-pointer" htmlFor={switchTagId}>
          {item.name}
        </label>
      </div>
  )
}

export default PickSwitch