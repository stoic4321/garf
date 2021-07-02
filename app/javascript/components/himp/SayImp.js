import { Marky } from '../Marky';
import React from 'react';
import { interpolateStrings } from '../himp/interpolateStrings'
import { SimpleImp } from './SimpleImp'

export const SayImp = ({ tf, parts, style, store }) => {
  let [__, txt] = parts;
  txt = interpolateStrings(txt, store.vars)
  txt = txt.replace(/^[ \t]+/, '') // trimLeft except for \n
  if (txt.match(/^\n/))
    return (
      <div style={{ marginLeft: 10, padding: '2px 0 15px 10px', border: 'solid 1px grey', ...style }}>
        <pre style={{ margin: '0 0 8px 0', paddingBottom: 0, borderBottom: '3px solid #ddd' }}>
          └{tfStr(tf)}: &lt;Markdown&gt;
      </pre>
        <Marky compsO={{ Foxer, CatImg }} txt={txt} />
        <div style={{ marginTop: 8, borderBottom: '3px solid #ddd' }}></div>
      </div>
    );
  return (<SimpleImp tf={tf} parts={parts} elType='s' style={style} />)
};
