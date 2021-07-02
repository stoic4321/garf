import React from 'react'
const JourneyTable = ({ journey }) => {
  const parseJourney = journey?.data ? Object.values(JSON.parse(journey.data)) : []
  return (
    <table className='table table-striped journey__table my-5'>
      <thead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Value</th>
          {/* <th>Severity</th> */}
        </tr>
      </thead>
      <tbody>
        {parseJourney.map((entry) => {
          const [n, v, i] = entry

          return (
            <tr>
              <td scope='row'>{n}</td>
              <td>{v.toString()}</td>
              {/* <td>{parseIdx(i)}</td> */}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default JourneyTable

// function parseIdx(idx) {
//   switch (idx) {
//     case 0:
//       return ''
//     case 1:
//       return 'Mild'
//     case 2:
//       return 'Moderate'
//     case 3:
//       return 'Severe'
//     default:
//       return ''
//   }
// }
