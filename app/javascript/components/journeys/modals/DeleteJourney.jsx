import React from 'react'
import { PopupModalHeader, PopupModalFooter } from '../../shared/PopupModal'

const deleteJourney = (e, journey, journeys, setJourneys, setToast, decoded) => {
  fetch(`/api/${decoded.key}/journeys/${journey.id}`, {
    method: 'DELETE',
    headers: { 'x-api-secret': decoded.secret, 'Content-type': 'application/json' }
  })
    .then((res) => res.json())
    .then((data) => {
      setJourneys(journeys.filter((jour) => jour.id !== journey.id))
      setToast({text:`Journey ${data.journey.name} deleted.`, variant:'primary', show:true})
    })
    .catch((error) => {
      // todo: Handle error gracefully
      console.error('CATCH', error)
      setToast({text:`There was an error deleting ${data.journey.name}.`, variant:'danger', show:true})
    })
}

const DeleteJourney = ({ journey, journeys, setJourneys, setToast, decoded }) => (
  <>
    <PopupModalHeader title='Are you sure you would like to delete this Health Journey? ' />
    <div className='modal-body'>
      <div className='m-4 d-flex justify-content-between'>
        <button className='btn btn-lg btn-secondary' data-dismiss='modal'>
          No
        </button>
        <button
          className='btn btn-lg btn-danger'
          data-dismiss='modal'
          onClick={(e) => deleteJourney(e, journey, journeys, setJourneys, setToast, decoded)}>
          Yes
        </button>
      </div>
    </div>
    <PopupModalFooter />
  </>
)

export default DeleteJourney
