import React from 'react'
import SaveJourney from '../journeys/SaveJourney'

const ReplaceLocalstorageModal = (props) => {
  const shareExtraFn = () => {
    window.localStorage.setItem('jourHash', JSON.stringify(props.shared.data))
    props.setShared(false)
  }
  const closeSaveModal = () => {
    props.setShared(false)
    window.localStorage.setItem('jourHash', JSON.stringify(props.shared.data))
  }
  return (
    <div className='modal d-block' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document' style={{ top: '10rem' }}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3 className='modal-title'>
              Would you like to save your current journey before replacing it with the shared
              journey?
            </h3>
            <button type='button' className='close' aria-label='Close' onClick={() => {
                closeSaveModal()
              }}>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <SaveJourney {...props} shareExtraFn={shareExtraFn} />
          </div>
          <div className='modal-footer justify-content-start'>
            <button
              type='button'
              className='float-left'
              onClick={() => {
                closeSaveModal()
              }}
              className='btn btn-danger'>
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplaceLocalstorageModal
