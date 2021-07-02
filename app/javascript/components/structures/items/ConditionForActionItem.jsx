import React from 'react';
import {mdOptions, Marky} from '../../Marky'

//----///////////////////---------------------------------------------
export const ConditionForActionItem = ({ item, doClick, children, conditionOnly }) => {
  const { name, data, text } = item
  const testDescription = 'Up to 50 words - Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonum- my nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.';
  return (
    <div
      // className="border border-secondary container"
      className="box"
      onClick={(ev) => doClick(ev, item, name)}
      style={{...item.style}}
    >
      <div className="ml-2 row pt-1 pb-2 d-flex">
        <h3 className="d-inline p-0">{name}</h3>
        <span className="m-0 ml-1 p-0" style={{color:'#ccc'}}> condition</span>
        {conditionOnly ? <p className=" col p-0 pl-2">{testDescription}</p> : null}
      </div>
      <div className="row m-0 mb-1">
        <div className="col-1">{' '}
        </div>
        <div className="col-11" style={{ color: '#777', fontSize:'30%' }}>
          <Marky txt={text||'  '}/>
        </div>
      </div>
      {children}
    </div>
  );
};
