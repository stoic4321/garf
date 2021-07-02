import React from 'react'

const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)

const PickIntegerLoBad = (props) => <PickInteger {...props} bad='low' />
const PickIntegerHiBad = (props) => <PickInteger {...props} bad='high' />


const findDecorator = (key) => ({
  feet: ((x)=>`${Math.floor(x/12)}' ${x%12}"`),
}[key] || (x=>x)) // lookup by key, then if none, use identity (aka "same as passed")
//----|||||||||||------------------------------------------------
const PickInteger = ({ item, enums, onPick, valueArr, name, bad }) => {
  const lo = parseInt(enums[0]),
    hi = parseInt(enums[1]) + 1,
    step = enums[2] && parseInt(enums[2]) || 1,
    rng = range(lo, hi, step).map((x) => x + ''),
    decoratorKey = enums[3] || null,
    decorateValFn= findDecorator(decoratorKey),
    bind = { item, onPick, value, name, bad, decorateValFn }

  const value = (valueArr && valueArr[1])||0// = item.pick?.length ? item.pick[1] : ''

  const focusRef = React.useRef(null)
  const [showPicker, setShowPicker] = React.useState(false)
  const handleClickOutside = (event) => {
    if (!focusRef.current?.contains(event.target)) {
      setShowPicker(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  return (
    <div>
      <button
        className='btn p-0 remove-btn-styles page-header__info pick-integer__btn'
        name={`pick${item.name}`}
        id={`pick${item.name}`}
        ref={focusRef}
        onClick={(ev) => setShowPicker(!showPicker)}>
        <span className=''>{name}:</span> {decorateValFn(value)}
      </button>
      <div className={`pick-integer__dropdown ${showPicker ? 'active' : 'inert'}`}>
        {rng.map((a, i) => {
          return (
            <button
              onClick={(ev) => onPick(ev, item, item.name, a, i)}
              key={a}
              className={`remove-btn-styles pick-integer__select ${decoratorKey? 'height' : '' }`}>
              {decorateValFn(a)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { PickIntegerLoBad, PickIntegerHiBad }
