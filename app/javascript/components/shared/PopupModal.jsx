import React from 'react'

export default function PopupModal(p) {
  // console.log('POPUP', p)
  return (
    <div
      className='modal fade'
      id='popupModalJourney'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='popupModal'
      aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className={`modal-content save-journey__popup-modal--${p.clz}`}>{p.children}</div>
      </div>
    </div>
  );
}

export function PopupModalHeader({ title, classes }) {
  return (
    <div className={`modal-header ${classes}`}>
      <h5 className='modal-title h3-font-size' id='popupModal'>
        {title}
      </h5>
      <button type='button' className='close h2-font-size' data-dismiss='modal' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  )
}

export function PopupModalFooter({ doClick, text }) {
  return (
    <div className='modal-footer'>
      <button type='button' className='btn btn-secondary' data-dismiss='modal'>
        Close
      </button>
      {doClick && (
        <button type='button' className='btn btn-primary'  data-dismiss='modal' onClick={(e) => doClick(e)}>
          {text}
        </button>
      )}
    </div>
  )
}
