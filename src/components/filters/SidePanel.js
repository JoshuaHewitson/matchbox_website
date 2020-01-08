import React, { PureComponent } from 'react'
import { styleConstants as sc } from '../../config'
import { Grid, Paper } from '@material-ui/core'

import TextContainer from '../TextContainer'

const SidePanel = (props) => {
  return (
    <Grid container style={{ position: 'fixed' }}>
      <Grid item xs={4}>
        <div style={{ height: props.height - sc.TOP_BAR_HEIGHT, overflowY: 'scroll', paddingRight: 10 }}>
          <Grid style={{ boxShadow: sc.IOS_BOX_SHADOW, backgroundColor: 'white', borderRadius: 5, marginLeft: 10, marginTop: 10, paddingRight: 30 }}>
            <TextContainer>
              {props.children}
            </TextContainer>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default SidePanel
