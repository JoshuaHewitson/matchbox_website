import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import 'react-animated-slider/build/horizontal.css'
import * as d3 from 'd3'
import { styleConstants as sc } from '../config'
import '../App.css'

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
    console.log(this.props.orient)
    if (this.props.orient === 'left') {
      axis = d3.axisLeft()
        .ticks(10, 's')
        .scale(this.props.scale)
    } else {
      axis = d3.axisBottom()
        .ticks(10, 's')
        .scale(this.props.scale)
    }

    d3.select(node).call(axis)
  }

  render () {
    return <g className='axis' ref='axisContainer' transform={this.props.translate} />
  }
}

class XYAxis extends React.Component {
  render () {
    return (
      <g className='xy-axis'>
        <Axis
          translate={`translate(0, ${this.props.height - this.props.padding})`}
          scale={this.props.xScale}
          orient='bottom'
        />
        <Axis
          translate={`translate(${this.props.padding}, 0)`}
          scale={this.props.yScale}
          orient='left'
        />
      </g>
    )
  }
}

class DataCircles extends React.Component {
  renderCircle (coords) {
    return (
      <circle
        cx={this.props.xScale(coords[0])}
        cy={this.props.yScale(coords[1])}
        fill={sc.PRIMARY_COLOR}
        stroke={sc.SECONDARY_COLOR_DARK_2} stroke-width='0.3'
        r={3}
        key={Math.random() * 1}
      />
    )
  }

  render () {
    return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>
  }
}

class ScatterPlot extends React.PureComponent {
  getXScale () {
    const xMax = d3.max(this.props.data, (d) => d[0])

    return d3.scaleLinear()
      .domain([0, xMax])
      .range([this.props.padding, (this.props.width - this.props.padding * 2)])
  }

  getYScale () {
    const yMax = d3.max(this.props.data, (d) => d[1])

    return d3.scaleLinear()
      .domain([0, yMax])
      .range([this.props.height - this.props.padding, this.props.padding])
  }

  render () {
    const xScale = this.getXScale()
    const yScale = this.getYScale()

    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
      </svg>
    )
  }
}

export default ScatterPlot
