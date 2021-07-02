import React, { useState } from 'react'
import caretIcon from 'images/icons/Icon_Caret_Down.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'
import { faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { sortAlphabetically, sortChronologically } from '../../helpers/sorting'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../../helpers/mediaQueries'

const SavedJourneysList = ({ journeys, clickFn }) => {
  const [type, setType] = useState('date')
  const [order, setOrder] = useState('desc')
  const [dateOrder, setDateOrder] = useState('asc')
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })

  const reverseOrder = (type) => {
    if (type === 'name') {
      return order === 'asc' ? setOrder('desc') : setOrder('asc')
    } else {
      return dateOrder === 'asc' ? setDateOrder('desc') : setDateOrder('asc')
    }
  }

  const sortJourneys = (jours) => {
    if (type === 'name') {
      return sortAlphabetically(jours, order)
    } else {
      return sortChronologically(jours, dateOrder)
    }
  }

  return (
    <div className='pr-md-4 box-content box'>
      <SortButtons {...{ order, setOrder, dateOrder, type, setType, reverseOrder }} />
      <div style={{ borderBottom: '1px solid black', marginRight: '2.25rem' }}></div>
      <div className='structures__scroll-box box-content'>
        {sortJourneys(journeys).map((journey, idx) => (
          <SavedJourney journey={journey} clickFn={clickFn} key={journey.id} />
        ))}
      </div>
    </div>
  )
}

const SortButtons = ({ order, dateOrder, setType, reverseOrder }) => (
  <div className='d-flex'>
    <button
      className='btn box-header start align-items-center mx-2 ml-0'
      onClick={() => {
        reverseOrder('name')
        setType('name')
      }}>
      Sort by Name
      <img src={caretIcon} className='ml-2' style={{ transform: order === 'asc' ? null : 'rotate(180deg)' }} />
    </button>
    <button
      className='btn mr-2 box-header start align-items-center mx-2'
      onClick={() => {
        reverseOrder('date')
        setType('date')
      }}>
      Sort by Date
      <img src={caretIcon} className='ml-2' style={{ transform: dateOrder === 'asc' ? null : 'rotate(180deg)' }} />
    </button>
  </div>
)

const SavedJourney = ({ journey, clickFn }) => {
  const bind = { clickFn, journey }
  const parseTime = () => {
    const date = new Date(journey.updated_at)
    return `${format(date, 'MMMM d, y')} | ${format(date, 'p')}`
    // return `${format(date, 'PPpp')}`
  }
  return (
    <div className='row py-4 mr-4 align-items-center border-bottom border-dark'>
      <div className='col-6'>
        <p
          className='h3-font-size'
          role='button'
          onClick={(ev) => clickFn(ev, 'load', journey)}
          data-toggle='modal'
          data-target='#popupModalJourney'
          style={{ cursor: 'pointer' }}>
          <strong>{journey.name}</strong>
        </p>

        <p>{parseTime()}</p>
      </div>
      <div className='col pr-0 center justify-content-between'>
        <JourneyButton text='Load' icon={faCaretSquareRight} {...bind} cls='info' />
        <JourneyButton text='Edit' icon={faEdit} {...bind} cls='success' />
        <JourneyButton text='Delete' icon={faTrashAlt} {...bind} cls='danger' />
        <JourneyButton text='Share' icon={faShareSquare} {...bind} cls='primary' />
      </div>
    </div>
  )
}

const JourneyButton = ({ text, icon, clickFn, journey, cls }) => (
  <button
    className={`image-as-button`}
    data-toggle='modal'
    data-target='#popupModalJourney'
    onClick={(ev) => clickFn(ev, text, journey)}>
    <FontAwesomeIcon icon={icon} className={`text-${cls}`} style={{ height: 30, width: 'auto' }} />
    <p>{text}</p>
  </button>
)

export default SavedJourneysList
