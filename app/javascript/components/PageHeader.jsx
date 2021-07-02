import React from 'react'
import strikeAPose from '../helpers/strikeAPose'
import { findStrucByName, StrucLens, StrucLensByKeyToComp, findStrucByHandle, findStrucsByParentKeyRegx } from './himp/StrucLens'
import { JustPickerItem } from './structures/items/JustPickerItem'
import {useMediaQuery} from 'react-responsive'
import { mobileBreakpoint } from '../helpers/mediaQueries'
import {MagicSay, genFilterByTagMagicSayComp} from './structures/impacts/MagicSay'
import { Impacts } from './structures/impacts/Impacts';
import { GradientLife } from './structures/impacts/GradientLife'

//-----------||||||||||----------------------------------------------------------------------------
export const PageHeader = ({ mode, jourHash, setJourVal, structures, allowUnity, store }) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint}px)` })
  // console.log('------genderStruct', genderStruct)
  // Todo: Currently the proper gender model is not loaded if female is selected on first load

/* --------------------------------- Selected Strucs --------------------------------- */
  const genderStruc = findStrucByHandle('#c_vitals_sex', structures)
  const selectedGender = jourHash[genderStruc.id] ? jourHash[genderStruc.id][1] : null

  const pose3DGender = (gender) => {
    if ((gender==null) || (gender=='Other')) gender = 'Female'
    strikeAPose({
      mesh:gender,
      hideShows: [{h:'.*'}, {s:'#external'}],
      settings:  [{bgColor: "#272c3d"}]
    })
  }

  const keepTryingUnity = () => {
    console.log("PAGE HEADER: keepTryingUnity()", window.unityComms)
    if (window.unityComms && window.unityComms.ready){
      pose3DGender(selectedGender)
    } else { setTimeout(()=>{ keepTryingUnity() }, 1000 * 5) }
  }
  React.useEffect(() => {
    if (allowUnity) keepTryingUnity()
  },[])

  const sexDoClick = (ev, item, name, val, idx) => {
    console.log('PageHeader.doClick()', item, name, val, idx)
    // let hash = item && item.data
    // if (hash.pose3D) hash.pose3D.mesh = val
    pose3DGender(val)
    if (val != undefined) setJourVal && setJourVal(item.handle, [name, val, idx])
  }
  const vitalsDoClick = (ev, item, name, val, idx) => {
    console.log('-------vitalsDoClick()',{ev, item, name, val, idx})
    if (item.handle=="#c_vitals_sex") pose3DGender(val)
    if (val != undefined) setJourVal && setJourVal(item.handle, [name, val, idx])
  }
  const summaryDoClick = (ev, item, name, val, idx) => {
    console.log('-------summaryDoClick()',{ev, item, name, val, idx})
    // if (item.handle=="#c_vitals_sex") pose3DGender(val)
    // if (val != undefined) setJourVal && setJourVal(item.handle, [name, val, idx])
  }
  //================================================================
  // const vitalStrucs = findStrucsByParentKeyRegx(structures, 'handle', '#g_vitals')
  const VitalsLens = StrucLensByKeyToComp('handle', '#c_vitals.*', JustPickerItem )
  //================================================================
  const JustSummaryImps = genFilterByTagMagicSayComp(/^#sum.*/)
  // const impComps = {say: MagicSay}
  const impComps = {say: JustSummaryImps}
  const markyComps = {GradientLife}
  const StrucOfFilteredImps = ({item}) => (<>
    {/* <div>{item.name}</div> */}
    <Impacts {...{item, store, impComps, markyComps}}/>
  </>)
  const SummaryCondLens   = StrucLensByKeyToComp('handle','#g_summary_conditions', StrucOfFilteredImps)
  const SummaryActionLens = StrucLensByKeyToComp('handle','#g_summary_actions',    StrucOfFilteredImps)
  //================================================================
  return (
    <div className={`ml-md-2 mt-sm-5 mt-md-0 mb-5 row box-header ${mode !== 'c' ? 'border-bottom border-dark ml-2' : ''} ${isMobile ? 'd-flex flex-column mt-5':''}`}>
      <div className={`p-0 ${isMobile ? 'd-flex justify-content-between mx-4' :'col-md-5 col-xl-4'}`}>
        <VitalsLens {...{list: structures, selectedGender, doClick: vitalsDoClick, jourHash}} />
      </div>
      {mode === 'c' ? (
        <>
          <SummaryCondLens {...{list: structures, doClick: summaryDoClick, jourHash}}/>
        </>
        ) : (
          <>
          <div className='col d-flex flex-column justify-content-around hidden-print'>
            <SummaryActionLens {...{list: structures, doClick: summaryDoClick, jourHash}}/>
            <div className='pt-2'>
              <p className='d-flex justify-content-between'>
                {['Age', '20', '30', '40', '50', '60', '70', '80+'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  )
}
