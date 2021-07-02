import React from 'react'
import { HealthJourneyDbg } from '../components/journeys/HealthJourneyDbg'


//----------------------////////////------------------------
export default function JourneyShow({journey}) {
  
  const OneJour = ({jour:[name, val]}) => (
    <div className="one-jour row">
      <div className="jcol jcol1 col-2">{name}</div>
      <div className="jcol jcol2 col-2">{(typeof val == 'boolean') ? ((val)?'true':'false') : val}</div>
    </div>
  )
  let jourHash = {jsonParseError:'---'}
  let jourEls = <>Err</>
  try {
    jourHash = JSON.parse(journey.data)
    jourEls = Object.entries(jourHash).map( ([k,v])=> (
      <OneJour jour={v}/>
    ))
  } catch( ev ) {
    jourHash = {jsonParseError: ev}
    console.error( "JourneyShow() Error: ", ev )
  }


  return (
    <div className="journey">
      <a className="back" href="/journeys">&lt;Back</a>
      <div className="box">
        <p className="label">Journey</p>
        <h1>{journey.name}</h1>
        <div className="jour-box container">
          {jourEls}
        </div>
        <HealthJourneyDbg jourHash={jourHash} />
      </div>
    </div>
  )
}