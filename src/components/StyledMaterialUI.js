import React from 'react'
import { styleConstants as sc } from '../config'
import {
  Tab,
  Tabs,
  Checkbox,
  Chip,
  Radio,
  MenuItem,
  Select,
  LinearProgress,
  Input,
  Slider,
  ExpansionPanel,
  ExpansionPanelSummary,
  Tooltip
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

export const StyledTabs = withStyles({
  root: {
    with: '100%'
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 70,
      // height: 1,
      width: '100%',
      backgroundColor: sc.PRIMARY_COLOR
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />)

export const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: sc.SECONDARY_COLOR_DARK_2,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    '&:focus': {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />)

export const StyledCheckBox = withStyles({
  root: {
    color: sc.SECONDARY_COLOR_DARK_2,
    '&$checked': {
      color: sc.SECONDARY_COLOR_DARK_2
    }
  },
  checked: {}
})(props => <Checkbox color='default' {...props} />)

export const StyledChip = withStyles({
  root: {
    // color: 'white',
    backgroundColor: sc.LIGHT_GREY,
    margin: 2
  }
})(Chip)

export const StyledSlider = withStyles({
  root: {
    color: sc.SECONDARY_COLOR_DARK_2
  },
  thumb: {
    backgroundColor: sc.SECONDARY_COLOR_DARK_2,
    '&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(47,137,128,0.1),0 4px 8px rgba(15, 48, 44,0.3),0 0 0 1px rgba(47,137,128,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: sc.IOS_BOX_SHADOW
      }
    }
  },
  active: {},
  track: {
    color: sc.PRIMARY_COLOR
  },
  rail: {
    color: sc.LIGHT_GREY,
    opacity: 1
  }
})(props => <Slider {...props} />)

export const StyledRadio = withStyles({
  root: {
    color: sc.PRIMARY_COLOR,
    '&$checked': {
      color: sc.SECONDARY_COLOR_DARK_2
    }
  },
  checked: {}
})(props => <Radio color='default' {...props} />)

export const StyledMenuItem = withStyles({
  root: {
    '&:focus': {
      backgroundColor: sc.LIGHT_GREY
    },
    '&:hover,&$active': {
      backgroundColor: sc.LIGHT_GREY
    },
    '& .Mui-selected': {
      backgroundColor: sc.LIGHT_GREY
    }
  },
  active: {}
})(props => <MenuItem color='default' {...props} />)

export const StyledMultipleSelect = withStyles({
  root: {
    '&:focus': {
      backgroundColor: 'white'
    }
  }
})(props => <Select {...props} />)

export const StyledSelect = withStyles({
  root: {
    '&:focus': {
      backgroundColor: 'white'
    }
  }
})(Select)

export const StyledInput = withStyles({
  root: {
    '&:focus': {
      borderColor: 'white'
    }
  },
  input: {
    '&:focus': {
      borderBottomColor: 'red'
      // backgroundColor: 'red'
    }
  }
})(Input)

export const StyledLinearProgress = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: sc.PRIMARY_COLOR_OPACITY
  },
  barColorPrimary: {
    backgroundColor: sc.PRIMARY_COLOR
  }
}))(props => <LinearProgress {...props} />)

export const GreyLinearProgress = withStyles(theme => ({
  root: {
    marginBottom: 30
  },
  colorPrimary: {
    backgroundColor: sc.LIGHT_GREY
  },
  barColorPrimary: {
    backgroundColor: sc.PLACE_HOLDER_TEXT_COLOR
  }
}))(props => <LinearProgress {...props} />)

export const StyledExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(152, 164, 185, 0.3)',
    boxShadow: '0 1px 1px rgba(47,137,128,0.4)',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(ExpansionPanel)

export const StyledExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(237,242,247, 1)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(ExpansionPanelSummary)

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: sc.SECONDARY_COLOR_DARK_2
  },
  tooltip: {
    backgroundColor: sc.SECONDARY_COLOR_DARK_2
  }
}))

export const BootstrapTooltip = (props) => {
  const classes = useStylesBootstrap()

  return <Tooltip arrow classes={classes} {...props} />
}
