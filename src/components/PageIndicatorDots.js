import React from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { styleConstants as sc } from '../config'
import '../App.css'

const DotButton = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'scale(1.2)'
    }
  }
}))(IconButton)

const PageIndicatorDots = (props) => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{
        flex: 1
        // border: 'solid #dddddd 0.5px'
      }}
    >
      {props.pages.map((page, index) => {
        if (props.selected === index) {
          return (
            <DotButton
              key={index}
              disableRipple
              disableFocusRipple
              style={{
                width: 60,
                height: 60
              }}
              onClick={() => {
                props.handleViewPageSection(props.pageRefs[index], index)
              }}
            >
              <div
                class='appear'
                style={{
                  height: 8,
                  width: 8,
                  border: 'solid #211c1f 0.5px',
                  boxShadow: '0px 0px 10px #2fe6a6',
                  backgroundColor: sc.PRIMARY_COLOR,
                  borderRadius: '50%',
                  margin: 10
                }}
              />
            </DotButton>
          )
        } else {
          return (
            <DotButton
              key={index}
              disableRipple
              disableFocusRipple
              style={{
                width: 60,
                height: 60
              }}
              onClick={() => {
                props.handleViewPageSection(props.pageRefs[index], index)
              }}
            >
              <div
                style={{
                  height: 5,
                  width: 5,
                  border: 'solid #211c1f 0.5px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  margin: 10
                }}
              />
            </DotButton>
          )
        }
      })}
    </Grid>
  )
}

export default PageIndicatorDots
