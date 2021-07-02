import React from 'react'
import { PopupModalHeader, PopupModalFooter } from '../../shared/PopupModal'
import QRCode from 'react-qr-code'

const ShareJourney = ({ journey }) => {
  const [copyNotification, setCopyNotification] = React.useState(false)

  const baseUrl = `${window.location.origin}/j`

  const copyNotifier = () => {
    setCopyNotification(true)
    setTimeout(() => {
      setCopyNotification(false)
    }, 5 * 1000)
  }

  const copyToClipboard = (e) => {
    e.preventDefault()
    const text = document.getElementById('shareUrl')
    text.select()
    text.setSelectionRange(0, 99999)
    document.execCommand('copy')
    copyNotifier()
  }
  const shareUrl = `${baseUrl}/${journey.token}`
  return (
    <div>
      <PopupModalHeader title='Share Journey' />
      <div className='modal-body'>
        {copyNotification && (
          <p className='text-center text-dark'>Share Url Copied to clipboard</p>
        )}
        <div className='d-flex flex-column'>
          <form>
            <div className='form-group w-100'>
              <div className='d-flex align-items-center'>
                <label htmlFor='shareUrl' className='h3-font-size mr-3 w-25'>
                  Share Url:
                </label>
                <input
                  className='form__input text w-75'
                  id='shareUrl'
                  name='shareUrl'
                  value={shareUrl}
                  readOnly
                />
              </div>
              <div className='d-flex justify-content-center m-4'>
                <QRCode value={shareUrl}/>
              </div>
              <button
                className='btn btn-secondary btn-lg w-100 mt-2'
                onClick={(e) => copyToClipboard(e)}>
                Copy
              </button>
            </div>
          </form>
        </div>
      </div>
      <PopupModalFooter />
    </div>
  )
}

export default ShareJourney
