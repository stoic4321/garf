import React from 'react'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../../helpers/mediaQueries'
//TODO: Add
const allDateFormats = (date) => (
  date
  )

const SearchJourneys = ({ searchJourList }) => {
  const [searchText, setSearchText] = React.useState('')
  const [searchDateText, setSearchDateText] = React.useState('')
  const [searchAnyText, setSearchAnyText] = React.useState('')
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })
  React.useEffect(() => {
    searchJourList([
      {schTxt:searchText,     tgtTextFn:((x)=>   x.name                  ), isAnd:true},
      {schTxt:searchDateText, tgtTextFn:((x)=>             x.updated_at  ), isAnd:true}, //isOr:true},
      {schTxt:searchAnyText,  tgtTextFn:((x)=>`${x.name} ${x.updated_at}`), isOr:true},
    ])
  }, [searchText, searchDateText, searchAnyText])

  return (
    <div className={`mt-5 pl-md-5 col-md-5 ${isMobile ? '':'border-left border-dark '}`}>
      <h3>Search</h3>
      <form className='mt-4'>
        <input
          className='form-control my-4 form__input text'
          aria-describedby='Journey Name'
          placeholder='Journey Name'
          name='journeyNameSearch'
          id='journeyNameSearch'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}></input>
        AND
        <input
          className='form-control my-4 form__input text'
          aria-describedby='Journey Date'
          placeholder='Journey Date'
          name='journeyDateSearch'
          id='journeyDateSearch'
          value={searchDateText}
          onChange={(e) => setSearchDateText(e.target.value)}></input>
        OR
        <input
          className='form-control my-4 form__input text'
          aria-describedby='Journey Health Architect'
          placeholder='Name or date'
          name='journeyHealthArchitect'
          id='journeyHealthArchitect'
          value={searchAnyText}
          onChange={(e) => setSearchAnyText(e.target.value)}></input>
      </form>
    </div>
  )
}
export default SearchJourneys
