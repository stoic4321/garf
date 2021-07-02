import React from 'react';

const KidWrap = ({children})=><>{children}</>

export const Recursor = ({ item, idx, compFinder, ...bind2 }) => {
  const [OneComp, ListComp, OneWrap] = compFinder(item)
  const bind =     {key:`rec_${item.id}_${idx}`, compFinder, ListComp, ...bind2}
  const itemBind = {item, ...bind}
  const next = <RecursorList list={item.children} {...bind} />
  if (OneWrap && OneComp) return (
    <OneWrap   {...itemBind}>
      <OneComp {...itemBind}>
        {next}
      </OneComp>
    </OneWrap>
  )
  if (OneWrap) return <OneWrap {...itemBind}>{next}</OneWrap>
  if (OneComp) return <OneComp {...itemBind}>{next}</OneComp>
  return next
}
const sortByKey = (list,key) => (list.length>1) ? list.sort((a, b) => (a[key] > b[key]) ? 1 : -1) : list
//-----------////////////-------------------------------------------
export const RecursorList = ({ list, ListComp, ...bind }) => {
  if (!list) return null
  list = sortByKey(list, 'ordering')
  const next = list.map((item,idx) => <Recursor key={`${item.id}_${idx}`} {...{...bind, item, idx}} /> )
  if (ListComp) return <ListComp {...{...bind}}>{next}</ListComp>
  return next
}
