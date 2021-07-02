import React from 'react'
import { extractParts } from './extractParts'

export const PickPipesNameUnder = (props) => (
  <PickPipes {...{...props, nameIsUnder: true}}/>
)
//----|||||||||||||||--------------------------------------------------------------
export const PickPipesNameOver = (props) => (
  <PickPipes {...{...props, nameIsOver: true}}/>
)
// todo: You should be able to tab or arrow <- -> through all the radios and select with keyboard. Currently they are not keyboard focusable.
//-----------|||||||||--------------------------------------------------------------
export const PickPipes = ({ item, enums, onPick, name, valueArr, bad = false, nameIsUnder=false, nameIsOver=false }) => {
  if (!item) return <></>
  // console.log("PICK ENUM", {item, name, valueArr})
  valueArr = valueArr || [item.name, false, 0] // in case it is not set yet

  const wrapDoClick = (ev, item, name, val, idx) => {
    console.log("ON SELECTION", {ev, item, name, val, idx})
    return onPick(ev, item, name, val, idx)
  }

  return (
    <div className="pick-pipes">
      {nameIsOver && name}
      <ul className='mb-0 p-0 d-flex flex-wrap'>
        {enums &&
          enums.map((enm, idx) => {
            const e = extractParts(enm, idx, enums.length, bad)
            const isPicked = e.word === valueArr[1] || idx == valueArr[2]
            return (
              <button className={`${isPicked ? 'active' : ''}`} key={idx}
                onClick={(ev) => wrapDoClick(ev, item, name, e.word, idx)}>
                {e.word}
              </button>
            )
          })}
      </ul>
      {nameIsUnder && name}
    </div>
  )
}
