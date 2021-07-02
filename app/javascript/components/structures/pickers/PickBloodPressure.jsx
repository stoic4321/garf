import React from 'react'

const PickBloodPressure = ({ item, onPick }) => {
  return (
    <div className='d-flex'>
      <div className='d-flex align-items-baseline'>
        <label htmlFor='Systolic' className='m-0 mr-2'>Systolic:</label>
        <select className='form-control' id='systolic'>
          {[...Array(20).keys()].map((el,i) => {
            return (
              <option
                key={el*10}
                value={el*10}
                onClick={e => { onPick(e, item, item.name, el*10, i) }}
              >
                {el*10}
              </option>
            )
          })}
        </select>
        <label htmlFor='Diastolic' className="mr-2 ml-3">Diastolic:</label>
        <select className='form-control' id='diastolic'>
          {[...Array(20).keys()].map((el,i) => {
            return (
              <option
                key={el*10}
                value={el*10}
                onClick={e => { onPick(e, item, item.name, el*10, i) }}
              >
                {el*10}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default PickBloodPressure
