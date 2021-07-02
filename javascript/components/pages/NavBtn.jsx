import React from 'react';
import setUrl from '../../helpers/setUrl'

//--------------///////------------------------------------------
export function NavBtn({ label, icon, onClick, url, top, modeLetter, setMode, mode, activeIcon }) {
  const [_, iconClass] = url.split('/')

  const [mouseEnter, setMouseEnter] = React.useState(false)
  const active = (mode == modeLetter)
  const click = () => {
    if(onClick) onClick()
    setUrl(url)
    setMode(modeLetter)
  }
  return (
    <div
      onMouseEnter={()=>setMouseEnter(true)}
      onMouseLeave={()=>setMouseEnter(false)}
      className={`cc-react-nav--btn center py-1 ${(active) ? 'active' : ''}`}
      onClick={click}
    >
      <a className="nav-link">
        <img
          alt={label}
          className={`cc-react-nav cc-icon cc-icon__${iconClass}`}
          src={(mouseEnter || active) ? activeIcon : icon} />
        <span className="sr-only">(current)</span>
        <div className={`cc-react-nav--subtext lh-115 ${(active || mouseEnter )? 'active' : ''}`}>{label}</div>
      </a>
    </div>
  );
}

//--------------///////------------------------------------------
export function NavBox(props) {
  return (
    <div className="position-fixed cc-nav-box hidden-print"  >
      <nav className="cc-leftcol cc-nav col-12 col-md-1 p-0">
        {props.children}
      </nav>
    </div>
  );
}

