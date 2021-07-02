import React, {useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import StructuresContainer    from '../structures/StructuresContainer'
import { NavBtn, NavBox } from './NavBtn'
import Toast from '../Toast'
import Icon_Conditions_Dark from 'images/icons/Icon_Conditions_Dark.svg'
import Icon_Conditions_Light from 'images/icons/Icon_Conditions_Light.svg'
import Icon_RiskSimulator_Light from 'images/icons/Icon_RiskSimulator_Light.svg'
import Icon_RiskSimulator_Dark from 'images/icons/Icon_RiskSimulator_Dark.svg'
import Icon_HealthJourneys_Dark from 'images/icons/Icon_HealthJourneys_Dark.svg'
import Icon_HealthJourneys_Light from 'images/icons/Icon_HealthJourneys_Light.svg'
import Unity from '../../helpers/Unity'
import JourneysList from '../journeys/JourneysList'
import { getDeviceType } from '../../helpers/getDeviceType'
import { addScriptElem } from '../../helpers/addScriptElem'
import LoginRedirect from '../LoginRedirect'

//----------------------///////////////-----------------
export default function MainPage(props) {
  // const allowUnity = false
  const allowUnity = (getDeviceType() == 'desktop')
  // console.log('MainPage',{props})
  const [journeys , setJourneys ] = useState(props.journeys)
  const [jourSaveNm,  setJourSaveNm] = useState('')
  const [mode,  setMode ] = useState(props.mode || 'c')
  const [toast, setToast] = useState({text:'Test Msg', show:false, variant:'primary'})
  const [shared, setShared] = useState(props.shared)

  const decoded = jwt.verify(props.jwtHash, process.env.JWT_SECRET, (err, json) => {
    // if (err) return null
    //todo: handle error or empty {}
    try {
      json = JSON.parse(json);
      return JSON.parse(json); // yes double parse for the win!!
    }
    catch(error) {return null}
  })

  useEffect(()=>{
    setTimeout(()=>{
      const els = document.getElementsByClassName('react-will-hide')
      els && [...els].forEach( e => e.style.setProperty('display', 'none') )
    }, 1) // wait 1 millisecond
  },[])

  useEffect(()=>{
    const journeysPage = mode === 'j'
    const unity = document.getElementById('unity-wrapper')
    const conditionsEl = document.getElementById('conditions')

    if (journeysPage){
      unity.style.setProperty('display', 'none')
      conditionsEl.classList.remove('col-md-7')
      // conditionsEl.classList.add('col-12')
    }else {
        unity.style.setProperty('display', 'block')
      // conditionsEl.classList.remove('col-12')
      conditionsEl.classList.add('col-md-7')
    }
  },[mode])

  useEffect(()=>{
    if(allowUnity) addScriptElem('unity.js')
  },[])

  const saveJour = () => {console.log(`saveJour(${jourSaveNm})`)}
  const setModePlus = (m)=>{
    if (m==='s') showSaveJourModal()
    else setMode(m)
  }

  //--- Avatar Button --------------------
  const [dbgSeen,setDbgSeen] = useState(false)

  const toggle3D_Dbg = (ev) => {
    Unity.showDebug(!dbgSeen)
    setDbgSeen(!dbgSeen)
  }
  const AvatarBtn = () => (
    <div
    onClick={toggle3D_Dbg}
    className="py-1 px-3 cc-avatar-btn hidden-print"
    role="button"
    >
      Avatar
    </div>
  )
  const icoTbl = {
    c: {icon: Icon_Conditions_Dark,    activeIcon: Icon_Conditions_Light},
    a: {icon: Icon_RiskSimulator_Dark, activeIcon: Icon_RiskSimulator_Light},
    j: {icon: Icon_HealthJourneys_Dark,activeIcon: Icon_HealthJourneys_Light},
  }
  const Navvy = ({x:[label, modeLetter, top, url]}) => (
    <NavBtn     {...{label, modeLetter, top, url, ...icoTbl[modeLetter], mode, setMode}} />
  )

  return (
    <>
      <div className='cc-main-page box'>
        <NavBox>
          <Navvy x={['Conditions',      'c',  '30', '/conditions']}/>
          <Navvy x={['Healthy Actions', 'a',  '80', '/actions'   ]}/>
          <Navvy x={['Health Journeys', 'j', '180', '/journeys'  ]}/>
        </NavBox>
        {toast.show && <Toast toast={toast} setToast={setToast}/>}
        {(mode=='j' || mode=='s') && (
          (decoded?.key) ? (
            <JourneysList  {...{ saveJour, journeys, setJourneys, setModePlus, setToast, decoded}}/>
          ): (
          <LoginRedirect/>
          ))
        }
        {(mode=='a' || mode=='c') &&
          <>
            <StructuresContainer    {...{ ...props, mode, setMode, setModePlus, allowUnity, shared, setShared, journeys, setJourneys}} />
            <AvatarBtn />
          </>
        }
      </div>
      {/* { allowUnity && <script src="unity.js"></script> } */}
    </>
  )
}
