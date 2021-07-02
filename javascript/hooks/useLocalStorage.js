import {useState} from 'react'

//----////////////////---------------------------------o
const useLocalStorage = ( initVal, keyNm ) => {
  const [storedVal,setStoredVal] = useState(()=>{
    try {
      if (!initVal || !keyNm) throw new Error('2 params expected in useLocalStorage(initVal:any, keyNm:string)')
      const item = window.localStorage.getItem(keyNm)
      return (item) ? JSON.parse(item) : initVal
    } catch( ev ) {
      console.error('Trouble in useLocalStorage!', ev)
      return initVal
    }
  })
  const setVal = (val) => {
    try {
      const valToStore = (val instanceof Function) ? val(storedVal) : val // unwrap func if needed to match useState's pattern
      setStoredVal(valToStore)
      window.localStorage.setItem(keyNm, JSON.stringify( valToStore ))
    } catch( ev ) {
      console.error('Trouble in useLocalStorage!', ev)
    }
  }
  return [storedVal,setVal]
} // Usage: ------------------------------

export default useLocalStorage