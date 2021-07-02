import React from 'react';
import { scoreToColor } from '../../../helpers/scoreToColor';
import { rnd } from "../../../helpers/rnd";
import { useEffect } from 'react';

//-------////////////////////---------------------------------------------
export function DecadesBox({ data }) {
  const fakeTimeline = () => ({ 
    mild:   { age: (rnd(3, 4) * 10), text: 'Mild' }, 
    severe: { age: (rnd(6, 8) * 10), text: 'Severe'}, 
    ok:     { text: 'Safe' }
  })
  const hash = data && JSON.parse(data)
  ,     timeLn = (hash && hash.timeline) || fakeTimeline()
  ,     ages = [20, 30, 40, 50, 60, 70, 80, 90]
  ,     ageToScore = (age) => (age > timeLn.severe.age) ? 10 : (age > timeLn.mild.age) ? 50 : 100
  ,     stlForAge =  (age) => ({ background: scoreToColor(ageToScore(age)) })
  ,     txtForAge =  (age) => (age > timeLn.severe.age) ? timeLn.severe.text : (age > timeLn.mild.age) ? timeLn.mild.text : timeLn.ok.text
  // console.log({ timeline: timeLn })

  useEffect(()=>{
    $('[data-toggle="tooltip"]').tooltip()
  },[])

  return (
    <div className="d-inline">
      {ages.map(age => (
        <div className="d-inline-block" key={age}
          // ref={(x)=>x.tooltip()}
          title={txtForAge(age)}
          data-placement="bottom"
          data-toggle="tooltip"
          style={{ ...stlForAge(age), position: 'relative', width:'3.3vw', height:'3.3vw', marginRight:'0.9vw' }}
        >
          <div className="d-inline" style={{ fontSize: 6, position: 'absolute', left:'1.2vw', top:'0.2vw', color: '#555' }}>Age</div>
          <div className="d-inline" style={{ fontSize: 10, position: 'relative', left:'1.2vw', top:'1.3vw' }}>{age}</div>
        </div>
      ))}
    </div>
  );
}
