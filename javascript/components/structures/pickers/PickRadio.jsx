import React from 'react'

export default function PickRadio() {
   // console.log("FLAVOR", condition.flavor)
  const bind = { jourHash, setJourVal }

  const filterConditions = condition.children.length
    ? condition.children.filter((i) => i.flavor === 'condition')
    : null

  const recurseChildren = filterConditions ? (
    <ConditionsList conditions={filterConditions} {...bind} />
  ) : null

  const [name, val, idx] =
    jourHash && jourHash[condition.handle] ? jourHash[condition.handle] : [null, null, null]

  const [checked, setChecked] = React.useState(val ? val : false)

  const doClick = (ev, name, val, idx) => {
    const hash = condition && condition.data
    hash && strikeAPose(hash.pose3D)
    if (val != undefined) {
      setJourVal && setJourVal(condition.handle, [name, val, idx])
      setChecked(val)
    }
  }
  return (
    <>
      <li className='my-4 d-flex align-items-center'>
        <input
          type='radio'
          className='conditions__radio--input'
          aria-label={condition.name}
          checked={checked}
          onClick={(e) => doClick(e, name, !checked, !checked ? 1 : 0)}
        />
        <label
          className={`conditions__radio--label ${checked ? 'font-weight-bold' : ''}`}
          htmlFor={condition.name}>
          {condition.name}
        </label>
      </li>
      {recurseChildren ? recurseChildren : null}
    </>
  )
}
