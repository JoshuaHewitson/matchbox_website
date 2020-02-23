import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import 'react-animated-slider/build/horizontal.css'
import * as d3 from 'd3'
import { styleConstants as sc } from '../config'
import '../App.css'
import { BootstrapTooltip } from './StyledMaterialUI'

// Calculate a linear regression from the data

// Takes 5 parameters:
// (1) Your data
// (2) The column of data plotted on your x-axis
// (3) The column of data plotted on your y-axis
// (4) The minimum value of your x-axis
// (5) The minimum value of your y-axis

// Returns an object with two points, where each point is an object with an x and y coordinate

function calcLinear (data, x, y, minX, minY) {
  /// //////
  // SLOPE//
  /// //////

  // Get just the points
  var pts = []
  var count = 0
  data.forEach(function (d, i) {
    var obj = {}
    obj.x = Number(d[x])
    obj.y = Number(d[y])
    if (!isNaN(obj.x) && !isNaN(obj.y)) {
      count++
      obj.mult = obj.x * obj.y
      pts.push(obj)
    }
  })

  // Let n = the number of data points
  var n = count

  // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
  // Let b equal the sum of all x-values times the sum of all y-values
  // Let c equal n times the sum of all squared x-values
  // Let d equal the squared sum of all x-values
  var sum = 0
  var xSum = 0
  var ySum = 0
  var sumSq = 0
  pts.forEach(function (pt) {
    sum = sum + pt.mult
    xSum = xSum + pt.x
    ySum = ySum + pt.y
    sumSq = sumSq + (pt.x * pt.x)
  })
  var a = sum * n
  var b = xSum * ySum
  var c = sumSq * n
  var d = xSum * xSum

  // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
  // slope = m = (a - b) / (c - d)
  var m = (a - b) / (c - d)

  /// //////////
  // INTERCEPT//
  /// //////////

  // Let e equal the sum of all y-values
  var e = ySum

  // Let f equal the slope times the sum of all x-values
  var f = m * xSum

  // Plug the values you have calculated for e and f into the following equation for the y-intercept
  // y-intercept = b = (e - f) / n
  b = (e - f) / n

  // return an object of two points
  // each point is an object with an x and y coordinate
  return {
    ptA: {
      x: minX,
      y: m * minX + b
    },
    ptB: {
      y: minY,
      x: (minY - b) / m
    }
  }
}

const labelFormat = (value) => {
  if (value >= 10000000) {
    return Math.round(value / 1000000) + 'M'
  } else if (value >= 1000000) {
    return (Math.round(value * 2 / 1000000) / 2) + 'M'
  } else if (value >= 50000) {
    return Math.round(value / 10000) * 10 + 'K'
  } else if (value >= 5000) {
    return Math.round(value / 1000) + 'K'
  } else {
    return (Math.round(value / 100) / 10).toFixed(1) + 'K'
  }
}

class Axis extends React.Component {
  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  renderAxis () {
    const node = ReactDOM.findDOMNode(this.refs.axisContainer)
    var axis
    // console.log(this.props.orient)
    if (this.props.orient === 'left') {
      axis = d3.axisLeft()
        .ticks(6, 's')
        .scale(this.props.scale)
    } else {
      axis = d3.axisBottom()
        .ticks(6, 's')
        .scale(this.props.scale)
    }

    d3.select(node).call(axis)
  }

  render () {
    return (
      <g className='axis' ref='axisContainer' transform={this.props.translate} />
    )
  }
}

class XYAxis extends React.Component {
  render () {
    return (
      <g className='xy-axis'>
        <Axis
          translate={`translate(0, ${this.props.height - (this.props.padding + 20)})`}
          scale={this.props.xScale}
          orient='bottom'
        />
        <Axis
          translate={`translate(${this.props.padding + 20}, 0)`}
          scale={this.props.yScale}
          orient='left'
        />
      </g>
    )
  }
}

class RegressionLine extends React.Component {
  render () {
    const lg = calcLinear(this.props.data, this.props.xVal, this.props.yVal, this.props.xMin, this.props.yMin)
    return (
      <g className='regression-line'>
        <line
          x1={this.props.xScale(lg.ptA.x)}
          y1={this.props.yScale(lg.ptA.y)}
          x2={this.props.xScale(lg.ptB.x)}
          y2={this.props.yScale(lg.ptB.y)}
          stroke={sc.BODY_TEXT_COLOR} stroke-width='1' strokeDasharray='10,5'
        />
      </g>
    )
  }
}

class DataCircle extends React.Component {
  render () {
    if (isNaN(this.props.coords[0]) || isNaN(this.props.coords[1])) return null
    else {
      var color = sc.PRIMARY_COLOR
      var r = 5
      var stroke = '0.5'
      if (this.props.selected) color = sc.PRIMARY_COLOR
      if (this.props.selected === this.props.item.key) {
        r = 8
        stroke = '1'
        color = sc.SECONDARY_COLOR
      }
      return (
        <g>
          <BootstrapTooltip arrow title={labelFormat(this.props.coords[0]) + ', ' + this.props.coords[1] + 'm²'}>
            <g>
              <g
                onClick={(event) => this.props.handleDotClick(this.props.item.key)}
              >
                <circle
                  class='dot'
                  cx={this.props.xScale(this.props.coords[0])}
                  cy={this.props.yScale(this.props.coords[1])}
                  fill={color}
                  stroke={sc.SECONDARY_COLOR_DARK_2} stroke-width={stroke}
                  r={r}
                  key={Math.random() * 1}
                />
                <circle
                  cx={this.props.xScale(this.props.coords[0])}
                  cy={this.props.yScale(this.props.coords[1])}
                  fill={sc.SECONDARY_COLOR_DARK_2}
                  // stroke={sc.SECONDARY_COLOR_DARK_2} stroke-width='0.5'
                  r={1}
                  key={Math.random() * 1}
                />
              </g>
            </g>
          </BootstrapTooltip>
        </g>
      )
    }
  }
}

class DataCircles extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hover: false }
  }

  renderCircle (coords, item) {
    return <DataCircle {...this.props} coords={coords} item={item} />
  }

  render () {
    return <g>{this.props.data.map((item) => this.renderCircle([Number(item[this.props.xVal]), Number(item[this.props.yVal])], item))}</g>
  }
}

class ScatterPlot extends React.PureComponent {
  getXScale () {
    const xMax = d3.max(this.props.data, (d) => Number(d[this.props.xVal]))
    const xMin = d3.min(this.props.data, (d) => Number(d[this.props.xVal]))

    return d3.scaleLinear()
      .domain([xMin, xMax])
      .range([this.props.padding + 20, (this.props.width - this.props.padding - (this.props.padding + 20))])
  }

  getYScale () {
    const yMax = d3.max(this.props.data, (d) => Number(d[this.props.yVal]))
    const yMin = d3.min(this.props.data, (d) => Number(d[this.props.yVal]))

    return d3.scaleLinear()
      .domain([yMin, yMax])
      .range([this.props.height - (this.props.padding + 20), this.props.padding])
  }

  render () {
    const xScale = this.getXScale()
    const yScale = this.getYScale()
    const yMax = d3.max(this.props.data, (d) => Number(d[this.props.yVal]))

    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          <RegressionLine xScale={xScale} yScale={yScale} xMin={0} yMin={yMax} {...this.props} />
          <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
          <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
          <text class='labelText' x={(this.props.width - this.props.padding - (this.props.padding + 20)) / 2} y={this.props.height - 10}>{this.props.xLabel}</text>
          <text class='labelText' x={-(this.props.height - this.props.padding - (this.props.padding + 20)) / 2} y={30} transform='rotate(270 20,40)'>{this.props.yLabel}</text>
        </svg>
      </div>
    )
  }
}

export default ScatterPlot
