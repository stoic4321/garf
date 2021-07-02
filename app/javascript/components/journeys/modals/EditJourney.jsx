import React, { useState } from 'react'
import { PopupModalHeader, PopupModalFooter } from '../../shared/PopupModal'

const EditJourney = ({ journey, journeys, setJourneys, setToast, decoded }) => {
  const [formData, setFormData] = useState(journey.name)

  React.useEffect(()=>{
    setFormData(journey.name)
  },[journey.name])

  const renameJourney = (e) => {
    e.preventDefault()
    fetch(`/api/${decoded.key}/journeys/${journey.id}`, {
      method: 'PATCH',
      headers: { 'x-api-secret': decoded.secret, 'Content-type': 'application/json' },
      body: JSON.stringify({ journey: { name: formData } })
    })
      .then((res) => res.json())
      .then((data) => {
        const jours = journeys.filter((jour) => jour.id !== data.journey.id)
        setJourneys([data.journey, ...jours])
        setToast({text:`Journey ${data.journey.name} edited successfully.`, variant:'primary', show:true})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <PopupModalHeader title='Edit Journey' />
      <div className='modal-body'>
        <form onSubmit={renameJourney}>
        <label htmlFor='journeyRename' className='h4-font-size'>
          <strong>Rename Journey:</strong>
        </label>
          <input
            className='form-control form__input text'
            aria-describedby='Journey Rename'
            placeholder='Minimum of 10 characters | Maximum 60 characters'
            name='journeyRename'
            id='journeyRename'
            value={formData}
            onChange={(ev) => setFormData(ev.target.value)}
          />
          <button
            type='button'
            className='btn btn-primary m-2'
            data-dismiss='modal'
            type='submit'
            onClick={(e) => renameJourney(e)}>
            Save
          </button>
        </form>
      </div>
      <PopupModalFooter />
    </>
  )
}
export default EditJourney
