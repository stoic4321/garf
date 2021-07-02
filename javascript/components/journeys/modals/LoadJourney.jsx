import React from 'react'
import { PopupModalHeader, PopupModalFooter } from '../../shared/PopupModal'
import setUrl from '../../../helpers/setUrl'
import useLocalStorage from '../../../hooks/useLocalStorage'

const LoadJourney = ({ journey, setModePlus, setToast }) => {
  const [jourHash, setJourHash] = useLocalStorage({}, 'jourHash')

  const loadJour = (e) => {
    setJourHash(journey.data)
    setToast({text:`${journey.name} loaded.`, variant:'primary', show:true})
    setUrl('/conditions')
    setModePlus('c')
  }

  return (
    <>
      <PopupModalHeader title='Load Journey' />
      <div className='modal-body'>
        <h4>Are you sure you want to load this journey?</h4>
        <h5>Your existing journey will be overwritten with this one.</h5>
      </div>
      <PopupModalFooter doClick={loadJour} text='Load Journey' />
    </>
  )
}

export default LoadJourney
