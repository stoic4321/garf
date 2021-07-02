import React from 'react';

//--------------////////------------------------------------------
export function JourBtn({ children }) {
  return (
    <span className="ml-3" style={{ textDecoration: 'underline' }}>
      {children}
    </span>
  )
}
//--------------/////------------------------------------------
export function Jour({ children }) {
  return (<div className="m-5 p-4 border border-dark bg-light">
    <h3 style={{ decoration: 'underline', display: 'inline', marginRight: 20 }}>
      {children}
    </h3>
    <JourBtn>Load</JourBtn> <JourBtn>Delete</JourBtn><br />
  </div>)
}
//--------------////////////------------------------------------------
export function JourneyList() {
  return (
    <div>
      <Jour>Tobacco journey</Jour>
      <Jour>Covid-19 journey</Jour>
      <Jour>COPD Journey</Jour>
      <Jour>High Blood Press. Journey</Jour>
      <Jour>Broken Bone Journey</Jour>
      <Jour>Covid-19 journey</Jour>
    </div>
  )
}