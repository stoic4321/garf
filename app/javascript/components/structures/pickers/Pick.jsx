import React from 'react'
import { scoreToColor, arrayToColor } from '../../../helpers/scoreToColor'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../../../helpers/mediaQueries'
import { extractParts } from './extractParts'


// todo: You should be able to tab or arrow <- -> through all the radios and select with keyboard. Currently they are not keyboard focusable.
const Pick = ({ item, enums, onPick, name, valueArr, bad = false }) => {
  if (!item) return <></>
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })
  // console.log("PICK ENUM", {item, name, valueArr})
  // console.trace()
  valueArr = valueArr||[item.name, false, 0]
  const checkValue = valueArr[2] !== 0
  const [checked, setChecked] = React.useState(checkValue)

  const onSelection = (ev, name, val, idx) => {
    // console.log("ON SELECTION", {ev, item, name, val, idx})
    setChecked(idx !== 0)
    return onPick(ev, item, name, val, idx)
  }

  return (
    <div className='d-flex align-items-center flex-wrap'>
    <div
      role='button'
      className='pick-dot' onClick={(e) => onSelection(e, name, !checked ? enums[1] : enums[0], !checked ? 1 : 0)}>
      <input
        type='radio'
        className=''
        style={{backgroundColor: 'red'}}
        aria-label={name}
        checked={checked}
        onChange={()=>{}}
      />
      {/*  style={{width:115}} */}
      <label className={`ml-4 ${checked ? `font-weight-bold` : ''}`} htmlFor={name}>
        {name}
      </label>
      </div>
      <div className='d-flex align-items-center' >
      <p className='m-0 ml-5'><strong>Select:</strong></p>
      <ul className={`mb-0 p-0 ml-2 d-flex align-items-center no-list-style ${isMobile ? 'flex-column':''}`}>
        {enums &&
          enums.map((enm, idx) => {
            const e = extractParts(enm, idx, enums.length, bad)
            const isPicked = e.word === valueArr[1] || idx == valueArr[2]
            {/* console.log("IS PICKED", {word:e.word, valueArr, isPicked}) */}
            return (
              <li className={`p-0 mx-2`} key={e.word}>
                <input
                  type='radio'
                  // checkedRadio={checked}
                  className='radio'
                  name={name + e.word}
                  id={name + e.word}
                  onChange={(ev) => onSelection(ev, name, e.word, idx)}
                  checked={isPicked}
                />
                <label
                  checked={isPicked}
                  className={`label--radio m-0 ${isPicked ? ' text-primary' : ''}`}
                  style={{whiteSpace:'nowrap'}}
                  htmlFor={name + e.word}>
                  {e.word}
                </label>
              </li>
            )
          })}
      </ul>
      </div>
    </div>
  );
}
export default Pick
