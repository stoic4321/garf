import React, { useState } from 'react'
import SaveJourney from './SaveJourney'
import PopupModal from '../shared/PopupModal'
import DeleteJourney from './modals/DeleteJourney'
import EditJourney from './modals/EditJourney'
import LoadJourney from './modals/LoadJourney'
import ShareJourney from './modals/ShareJourney'
import SearchJourneys from './SearchJourneys'
import SavedJourneysList from './SavedJourneysList'
import {everyKeyHasVal} from '../../helpers/objects'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../../helpers/mediaQueries'

const compLookup = (modalComp, props) => {
  const bind = { journey: modalComp.journey, ...props }
  const lookup = {
    delete: <DeleteJourney {...bind} />,
    edit: <EditJourney {...bind} />,
    load: <LoadJourney {...bind} />,
    share: <ShareJourney {...bind} />
  }
  return lookup[modalComp.text]
}

const sortJourneys = (journeys) => {
  return journeys.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
}

export default function JourneysList({ journeys, setJourneys, saveJour, setModePlus, setToast, decoded }) {
  const [modalComp, setModalComp] = useState({ text: 'load', journey: journeys[0] })
  const [searchedJourneys, setSearchedJourneys] = React.useState(sortJourneys(journeys))
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })
  // console.log('JOURNEYS=', journeys)
  const clickFn = (e, text, journey) => {
    text = text.toLowerCase()
    setModalComp({ text, journey })
  }

  React.useEffect(() => {
    setSearchedJourneys(journeys)
  }, [journeys])

  const lower = (s) => ((s || '').toLowerCase())
  const xor = (a,b) => (   0 == ( (a?1:0) ^ (b?1:0) )   )
  //----||||||||||||||||------------------------------------------------
  const filterByMatchers = (journeys, matchers) => {

    return journeys.filter((item) => {
      let match = true
      // calc match using all the matchers
      matchers.forEach( ({schTxt, tgtTextFn, isAnd, isOr}) => {
        if (schTxt.trim()) {
          const tf = lower( tgtTextFn(item) ).includes( lower(schTxt) )
          if (isAnd) match &&= tf
          if (isOr ) match ||= tf
          // console.log(`${tf} (${schTxt} ?== ${tgtTextFn(item)}) match=${match}`)
        } else xor(match,true)
      })

      return match // after forEaching the matchers, this is returned to the filter telling it what to remove/keep
    })
  }
  //----||||||||||||||------------------------------------------------
  const searchJourList = (matchers) => {
    const allBlank = everyKeyHasVal(matchers, 'schTxt', '') // const allBlank = matchers.map(m=>m.schTxt).every(m=>m=="")
    const searchedJours = (allBlank) ? journeys : filterByMatchers(journeys, matchers)
    // console.log('=======searchJourList', {allBlank, list:searchedJours.map(x=>x.name)} )
    // console.log('=======searchJourList.searchedJours.length=', searchedJours.length )
    setSearchedJourneys(searchedJours) // return unfiltered ones if all are blank
  }

  const bind = { clickFn, saveJour, journeys, setJourneys, decoded }
  const modalBind = { journeys, setJourneys, setModePlus, setToast, decoded }

  return (
    <div className={`p-4 h-100 ${isMobile ? 'mt-5':'row '}`}>
      <div className='col-md-7 tester1 h-100 box'>
        <div className="box-header">
          <h1 className='h2-font-size'>Save Journey</h1>
          <SaveJourney {...bind} />
        </div>
        <SavedJourneysList journeys={searchedJourneys} setJourneys={setJourneys} clickFn={clickFn} />
      </div>
      <SearchJourneys searchJourList={searchJourList} />

      <PopupModal clz={modalComp.text.toLowerCase()}>{compLookup(modalComp, modalBind)}</PopupModal>
    </div>
  )
}
