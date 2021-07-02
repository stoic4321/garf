import React from 'react'
import Pick from './Pick'

const PickSeverity = ({ onPick, name, value }) => {
  return (
    <Pick
      enums={['None##ccc', 'Mild%%99', 'Moderate%%50', 'Severe%%5']}
      name={name}
      onPick={onPick}
      value={value}
    />
  )
}

export default PickSeverity