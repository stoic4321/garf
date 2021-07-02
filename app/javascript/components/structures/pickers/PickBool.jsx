import React from 'react'

const PickBool = ({ item, enums, onPick }) => {
  const click = (ev,val) => { 
    // console.log('ev, name, ev.target.checked', ev, name, ev.target.checked)
    onPick(ev, item, item.name, val)
  }
  return (
    <>
      <button className='btn btn-primary m-2' onClick={e => click(e, true)}>
        True
      </button>
      <button className='btn btn-primary m-2' onClick={e => click(e, false)}>
        False
      </button>
    </>
  )
}

export default PickBool