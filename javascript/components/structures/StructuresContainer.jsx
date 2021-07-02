import React, { useEffect }  from 'react'
// import { fetchViaJwtThenSetHash } from '../helpers/fetchViaJwtThenSetHash'
import useLocalStorage from '../../hooks/useLocalStorage'

import { SayImp } from '../himp/SayImp'
import { SimpleImp } from '../himp/SimpleImp'
import {prepStrucs} from '../himp/himp'

import { ConditionsList } from '../conditions/ConditionsList'
import ImpactsList from '../impacts/ImpactsList'
import { PageHeader } from '../PageHeader'
import Stepper from '../actions/Stepper'
import ReplaceLocalstorageModal from './ReplaceLocalStorageModal'
import { HealthJourneyDbg } from '../journeys/HealthJourneyDbg'
import { withMergeHash } from '../../hooks/withMergeHash'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../../helpers/mediaQueries'
window.Clicked3DMarker = function(str) {
  console.log('Clicked3DMarker()', str);
}

//----------------------////////////////////-----------------------------------
const ActionsPane =   ({...bind}) => (
  <Stepper {...bind} />
)
//----------------------////////////////////-----------------------------------
const ConditionsPane = ({setModePlus, ...bind}) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })
  return <>
    <div className={`ml-md-2 box-content ${isMobile ? '':'row '}`}>
      {/* List of Conditions with Radio Btns */}
      <div className='col-md-5 p-0 box'>
          <h4>Conditions</h4>
          <div className='structures__scroll-box box-content'>
            <ConditionsList {...bind} />
        </div>
      </div>
      {/* List of Impacts */}
      <div className={`col pl-md-3 box ${isMobile ? '':'border-left border-dark '}`}>
      <h4 className="mb-4">Impacts</h4>
        <ImpactsList {...bind} />
      </div>
    </div>
    <div className='row justify-content-end box-footer'>
      <button className='btn btn-primary text-light font-weight-bold'
        onClick={ (e) => setModePlus('a') }>
        {'Next >>>'}
      </button>
    </div>
  </>;
}
//----------------------////////////////////-----------------------------------
export default function StructuresContainer(props){
  let {jwtHash, structures, mode, setMode, ...bind2} = props
  // const [structures, setStructures] = useState([])
  // useEffect(()=>{
    //   fetchViaJwtThenSetHash(jwtHash, 'structures', setStructures)
  // },[])

  if (props.shared &&  window.localStorage.getItem('jourHash')){
    return (<ReplaceLocalstorageModal {...props}/>)
  }

  const [jourHash, setJourHash, setJourValReal] = withMergeHash(useLocalStorage(props.shared?.data || {},'jourHash'))
  // console.log("SHOW MODA", showModal)
  //----///////////-----------------------------------
  const setJourVal = (key, val) => {
    setJourValReal(key, val)
  }
  if (!structures) return null
  const himpComps = {
    if:SimpleImp,
    say:SayImp
  }
  var store = {}
  // useEffect(()=>{
  // })
  prepStrucs(structures, jourHash, himpComps, store) // [0] removes outer []
  //console.log('STRUC CONTAINERS.handles', store.handles)
  const bind = {mode, setMode, store, jourHash, setJourVal, ...bind2, structures}
  return (
    <>
      <PageHeader {...bind} />
      {(mode == 'c') ?
        <ConditionsPane {...bind} />
        :
        <ActionsPane {...bind}/>
      }
      {/* <div className='mt-5 pt5'>
        <HealthJourneyDbg jourHash={jourHash} />
      </div> */}
    </>
  )
}
