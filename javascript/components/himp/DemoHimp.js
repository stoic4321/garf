
import  React, {useEffect, useState}  from 'react'
import {prepStruc,parsePicker} from '../himp/himp'
import {exampleStrucs} from '../himp/exampleStrucs'
import {safeIth} from '../../helpers/array'
import {ks, ksGo} from '../../helpers/keySafe'
import { SayImp } from './SayImp'
import { SimpleImp } from './SimpleImp'

//-------------------------------------------------------------

//======================/////////============================
export default function DemoHimp() {

  //-------------------------------------------
  let [jours,setJours] = useState({
    // "<struc.id>" : ["struc.name", "<picked_value>", <index_of_enum>]
    "1": ["Symptom: Difficulty sleeping", 1, 1],
    "2": ["Diagnosis: CPOD", "Mild", 2],
    "3": ["Sleep apena", "Moderate", null],
    "4": ["Use CPAP breathing assistant when sleeping", "Nightly", 2],
  })

  const ff = [
    {txt:'\n## Fooness\n**foo** boo', tag:'#21.R.Mild'},
    {txt:null, tag:'#SpecialTag'},
  ]

  const tfStr = (tf) => (tf) ? "T" : "F"
  const GreenImp =(p) => {
    return <SimpleImp {...{...p, stl:{fontWeight:'bold',color:'white',background:'#dfd',textDecoration:'line-through'}}} />
  }

  const FixImp = (p) => {
    // useEffect(()=>{p.parts.push('FIX')},[p.parts])
    return <SimpleImp {...{...p, stl:{fontWeight:'bold'}}} />
  }

    //    //////////////
  const RendImpCompOs = ({impCompOs,id}) => (<span key={ks('imps_'+id)}
    style={{marginLeft: 5, color: "#606"}}>
      {impCompOs.map(x=>x.map(ico=>(
        ico.comp && <ico.comp {...ico} store={store}/>
      )))}
  </span>)
  //----//////-----------
  const doPick = (pick,struc,store,jours) => {
    const [verb,list,tag] = parsePicker(struc.picker)
    let newJours = {...jours}
    if (verb) {
      const pTs = store.pickerTags[tag] || [struc]
      if (pTs) {
        pTs.forEach(x=>{
          // console.log('pickerTags=',x)
          newJours[x.id] = newJours[x.id] || [x.name,pick,null]
          newJours[x.id][1] = pick
        })
        strucs = prepStruc(exampleStrucs, jours, comps, store)
      }
    } else {
      newJours[struc.id] = [struc.name,pick,null]
    }
    setJours( newJours )
    // console.log('doPick=',JSON.stringify(newJours).replace(/],/g,'],\n'), pick, [verb,list,tag])
  }
  //----///////////////////-------------------------------
  const findAndParsePicker = (picker,pickerTags) => {
    let [verb,btns,tag] = parsePicker(picker)
    if (!verb && tag && pickerTags) {
      const pTs = pickerTags[tag]
      picker = pTs && pTs.length>0 && pTs[0].picker
      const arr = parsePicker(picker)
      verb=arr[0]; btns=arr[1]; tag=arr[2]
    }
    return [verb,btns,tag]
  }
  const parsePick = (pick) => {
    const pck = safeIth(pick,1)
    if (!pck) return null
    if (typeof pck === 'boolean') return pck
    return (pck.match(/^on|^yes|^1$|true/i)) ? 'Yes' : 'No'
  }
  //----///////--------------------------------------------
  const Picker = ({struc,doPick,store,jours}) => {
    let {picker,pick=[],id} = struc
    if (!picker) return null

    let [verb,btns,tag] = findAndParsePicker(picker, store.pickerTags)
    return (
      <div key={ks("picker_"+id)}
        style={{marginLeft: 30, color: "#066"}}
      >
        <pre style={{display:'inline'}}>{picker}</pre> {/*' : ' +pick[1]*/}
        {btns && btns.map( (btn)=>{
          const stl= (btn===pick[1]) ? {border:'3px black solid'} :{}
          return (
            <button
              onClick={ ()=>doPick(btn,struc,store,jours) }
              style={{background:'#ccc', margin:4, padding:2, ...stl}}
            >
              {btn}
            </button>)
        })}
      </div>
    )
  }
  //    ////
  const Top = ({struc,children}) => (<div key={ks('top_'+(struc.id || "?"))}
    style={{marginTop:20, paddingTop:4,borderTop:'1px solid grey',
    ...(struc.style||{})}}>
      {children}
  </div>)
  //    //////////
  const StrucShow = ({struc:{flavor,name,id}}) => <div key={ks('struc_'+id)}
    style={{background:'#ddd', padding:5}}>
      <span style={{background:'white',padding:2,lineHeight:2,fontSize:10}}>{`${flavor} :`}</span>
      {` ${name} [${id}]`}
  </div>
  //    ///////
  const PadGrey = ({struc:{id},children}) => (<span key={ks("pick_"+id)}
    style={{marginLeft: 30, color:'#ccc'}}>
      {children}
  </span>)
  //    /////////
  const PickShow = ({struc:{pick, id}}) => (<span key={ks("pick_"+id)}
    style={{color: "#050", fontWeight:600}}>
    {safeIth( pick, 1)}
  </span>)
  //----//////-----------
  const Struc = ({struc, comps, store, jours}) => {
    if (!struc) return <div>null</div>
    if(!struc.id) return <div style={{background:'red',color:'white',margin:10,padding:5}}>Missing id of struc:{JSON.stringify({...struc,impacts:null})}</div>
    if (struc.impCompOs.length>0) console.log('struc.impCompOs=', struc.impCompOs, struc.name)
    //---------------------------------------------
    return [
      <Top {...{struc}}>
        <StrucShow struc={struc} />
        <Picker   {...{struc, doPick, store, jours}} />
        <PadGrey  {...{struc}}>Pick = </PadGrey>
        <PickShow {...{struc}} />
        <RendImpCompOs impCompOs={struc.impCompOs} id={struc.id}/>
      </Top>,
      Strucs({strucs: struc.children, comps, store, jours}) // recurse children
    ]
  }
  //----///////-----------
  const Strucs = ({strucs, comps, store, jours}) => {
    return (
      strucs && strucs.map((struc,i) => (
        <Struc {...{struc, store, comps, jours}} key={struc.name || `?${i}`} />
    ))
  )}
  const Foxer = ({txt}) => <div>Fox: {txt}</div>
  const CatImg = ()=><img alt="" style={{width:50, display:'inline', verticalAlign: 'middle'}} src="https://octodex.github.com/images/stormtroopocat.jpg"/>
  const StrikeImp = ({tf,parts}) =>(
    <pre>{`${tfStr(tf)}: ${parts.join('(')})`}</pre>
  )

  //-------------------------------------------
  const comps = { // verb to Component lookup for Impacts
    if:SimpleImp,
    andIf:SimpleImp,
    say:SayImp,
    sumSay:SayImp,
    fix:FixImp,
    strikethrough: StrikeImp,
    Raw:SimpleImp,
    greeny:GreenImp,
  }
  let store = {}
  let strucs = prepStruc(exampleStrucs, jours, comps, store)
  console.log( 'structures=', strucs )
  console.log( 'store=', store )
  const summary = store.sumImps.sort(x=>x.rank).map(x=>[x])
  useEffect(()=>{
    console.log(new Date().toTimeString().slice(0,8),'=========================================================')
  },[strucs])
  //-------------------------------------------
  return (
    <div className="App">
      <h3>Health Impact Code (Himp)</h3>
      <div style={{border:'solid 1px blue', padding:8}}>
        Summary .say()scollected from .sumSay() statements<br/> <br/>
        <RendImpCompOs impCompOs={summary} id='summary'/>
      </div>
      {/* <pre>{JSON.stringify(summary, null, 2)
        .replace(/,[\n\s]+"/mg,', "').replace(/{[\n\s]+/mg,'{')
      }</pre> */}
      <div style={{border:'solid 1px green', padding:8}}>
      vars:
      <pre>{JSON.stringify(store.vars, null, 2)}</pre>
      </div>
      <pre>{JSON.stringify(store.err, null, 2)}</pre>
      <Strucs {...{strucs, store, comps, jours}}/>
      <h1>☯</h1>
    </div>
  )
}
if (!ks.went) ksGo()
