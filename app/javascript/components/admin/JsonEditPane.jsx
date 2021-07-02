import React, { useState } from 'react'
import JSONInput from '../../JSONInput';
import locale    from '../../JSONInput/locale/en';

//-------////////////////////---------------------------------------------
export default function JsonEditPane(props) {
  const {data, name, id, style, ...restOfProps} = props
  let hash = data
  try {
    if (typeof hash == 'string') {
      hash = (hash && JSON.parse( data )) || {}
    }
  } catch(e) {
    hash = data
  }
  return (
    <JSONInput
        inputBind   = {{name,id,style}}
        theme       = 'dark_vscode_tribute'
        waitAfterKeyPress = {2000}
        placeholder = {hash}
        locale      = {locale}
        {...{...restOfProps}}
    />
  )
}
