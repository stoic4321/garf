import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

//----////////////-----------------
export default function SaveJourney({ journeys, setJourneys, shareExtraFn, decoded}) {
  const [formData, setFormData] = useState('')
  const [isNewJourney, setIsNewJourney] = useState(true)
  const [jourHash, setJourHash] = useLocalStorage({}, 'jourHash')

  /* ----------------------------- Api Interaction ---------------------------- */
  const saveNewJourney = () => {
    fetch(`/api/${decoded.key}/journeys`, {
      method: 'POST',
      headers: { 'x-api-secret': decoded.secret, 'Content-type': 'application/json' },
      body: JSON.stringify({ journey: { name: formData, data: jourHash } })
    })
      .then((res) => res.json())
      .then((data) => {
          setJourneys([data.journey, ...journeys])
          setFormData('')
          if (shareExtraFn){
            shareExtraFn()
          }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const saveExistingJourney = (e) => {
    console.log("SAVE THIS", {e, formData});
    fetch(`/api/${decoded.key}/journeys/${formData}`, {
      method: 'PATCH',
      headers: { 'x-api-secret': decoded.secret, 'Content-type': 'application/json' },
      body: JSON.stringify({ journey: { data: jourHash } })
    })
      .then((res) => res.json())
      .then((data) => {
        const jours = journeys.filter(jour => jour.id !== data.journey.id)
        setJourneys([data.journey, ...jours])
        if (shareExtraFn){
          shareExtraFn()
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  /* ----------------------------------- // ----------------------------------- */

  const saveJourney = (e) => {
    e.preventDefault()
    if (isNewJourney) {
      console.log('New Jour');
      saveNewJourney()
    } else {
      console.log('Existing Jour');
      saveExistingJourney()
    }
  }

  const bind = {
    journeys,
    saveJourney,
    formData,
    setFormData,
    isNewJourney,
    setIsNewJourney
  }

  return (
    <div className='d-flex justify-content-center flex-column'>
      <SaveJourneyForm {...bind} />
    </div>
  )
}

const SaveJourneyForm = ({
  journeys,
  formData,
  setFormData,
  isNewJourney,
  setIsNewJourney,
  saveJourney
}) => {
  const isDisabled = formData === ''

  const resetInputArea = (e) => {
    setFormData('')
    setIsNewJourney(!isNewJourney)
  }

  return (
    <form onSubmit={saveJourney}>
      <div className='form-group'>
        <label htmlFor='journeyName' className='ml-3 h4-font-size lh-100'>
          <strong>Journey Name:</strong>
        </label>
        {isNewJourney ? (
          <NewJourneyInput formData={formData} setFormData={setFormData} />
        ) : (
          <ExistingJourneyDropdown
            journeys={journeys}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        <div className='row justify-content-between align-items-center'>
          <OverwriteCheckbox isNewJourney={isNewJourney} resetInputArea={resetInputArea} />
          <p className='p-2 mr-4'>Date | Time</p>
        </div>
      </div>
      <button
        className={`btn btn-${isDisabled ? 'secondary' : 'primary'} btn-lg float-right text-light`}
        onClick={(e) => saveJourney(e)}
        type='submit'
        disabled={isDisabled}>
        Save
      </button>
    </form>
  )
}

const ExistingJourneyDropdown = ({ journeys, setFormData }) => (
  <select
    className='form-control form__input dropdown'
    name='jourName'
    id='journeyName'
    onChange={(ev) => setFormData(ev.target.value)}>
    <option disabled value={null}>Select Journey</option>
    {journeys.map((jour) => {
      console.log('jour:', jour)
      return (
      <option value={jour.id} key={jour.id}>
        {jour.name}
      </option>
    )})}
  </select>
)

const NewJourneyInput = ({ formData, setFormData }) => (
  <input
    className='form-control form__input text'
    aria-describedby='Journey Name'
    placeholder='Minimum of 10 characters | Maximum 60 characters'
    name='journeyName'
    id='journeyName'
    value={formData}
    onChange={(ev) => setFormData(ev.target.value)}
  />
)

const OverwriteCheckbox = ({ isNewJourney, resetInputArea }) => (
  <div className='ml-4 d-flex align-items-center'>
    <div className='pick-dot'>
      <input
        type='checkbox'
        name='overwriteExistingJourney'
        id='overwriteExistingJourney'
        onChange={(e) => resetInputArea(e)}
        checked={!isNewJourney}
      />
      <label className='ml-4 mb-0' htmlFor='overwriteExistingJourney'>
        Overwrite Existing Journey
      </label>
    </div>
  </div>
)
