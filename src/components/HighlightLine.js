import React from 'react'
import { styleConstants as sc } from '../config'

const HighlightLine = () => {
  return (
    <div
      class='appear' style={{
        height: 5,
        borderRadius: 2.5,
        width: 100,
        backgroundColor: sc.PRIMARY_COLOR
        // boxShadow: `0 2px 5px 2px ${sc.PRIMARY_COLOR_OPACITY}`
      }}
    />
  )
}

export default HighlightLine
