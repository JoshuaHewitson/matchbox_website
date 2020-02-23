import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid
  // DialogContentText
  // DialogActions
} from '@material-ui/core'
// import { styleConstants as sc } from '../config'
import PropertyProfileBar from './feed/PropertyProfileBar'
import '../App.css'

const ViewDetails = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        maxWidth='lg'
        onClose={() => props.handleViewDetails(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {/* <PropertyProfileBar item={props.item} handleBackButton={() => props.handleBackButton()} thumb={props.item.images[0].src} /> */}
          {props.title}
        </DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={() => handleClose()} style={{ color: sc.BODY_TEXT_COLOR }} color={sc.PRIMARY_COLOR}>
            Cancel
          </Button>
          <Button onClick={() => handleClose()} style={{ color: sc.PRIMARY_COLOR }} color={sc.PRIMARY_COLOR}>
            Login
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  )
}

export default ViewDetails
