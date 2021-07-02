import React from 'react';

//----//////////---------------------------------------------
export const GroupItem = ({ item, doClick, children }) => {
  const { id, name, text, depth } = item
  const bind = {
    onClick: (ev) => { doClick(ev, item, name); },
    className: 'conditions__condition ml-1 mb-0',
    style: { padding: 5, marginLeft: (depth * 10) }
  };
  return (
    <div {...bind}>
      <h4 className='conditions__group-title w-100'>
        {name}
        <span style={{color:'#ccc'}}> Group {item.ordering}.</span>
      </h4>
      <br/>
      {children}
    </div>
  );
};
