"use strict"

import React from "react"
import PollSwitch from "./poll-switch"


export default class PollTable extends React.Component {
  renderHourHeaderCell(i) {
    const hour = this.props.hours[i]

    return <th key={ "th:hour:" + hour }>{ hour }</th>
  }

  getWorkshopIndex(i) {
    return Object.keys(this.props.workshops)[i]
  }

  getWorkshopLabel(i) {
    return this.props.workshops[this.getWorkshopIndex(i)]
  }

  renderRow(i) {
    return (
      <tr key={ "tr:" + i }>
        <th>{ this.getWorkshopLabel(i) }</th>
        { this.props.hours.map((h, j) => this.renderCell(i, j)) }
      </tr>
    )
  }

  renderCell(rowIndex, hourIndex) {
    const hour = this.props.hours[hourIndex]
    const workshop = Object.keys(this.props.workshops)[rowIndex]

    return (
      <td key={ workshop + "/" + hour }>
        <PollSwitch
          workshop={ workshop }
          hour={ hour }
          { ...this.props }
        />
      </td>
    )
  }

  render() {
    const controlledScrolling = this.props.left !== undefined || this.props.top !== undefined
    const hours = this.props.hours

    return (
      <table>
        <thead>
          <tr>
            <th rowSpan={ 2 }>Ateliers</th>
            <th colSpan={ this.props.hours.length }>Tranches horaires</th>
          </tr>
          <tr>
            { this.props.hours.map((_, i) => this.renderHourHeaderCell(i)) }
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.props.workshops).map((_, i) => this.renderRow(i)) }
        </tbody>
      </table>
    );
  }
}

PollTable.propTypes = {
  "scrollTop": React.PropTypes.number,
  "scrollLeft": React.PropTypes.number,
  "rowHeight": React.PropTypes.number,
  "tableWidth": React.PropTypes.number,
  "tableHeight": React.PropTypes.number,
  "who": React.PropTypes.string.isRequired
}

PollTable.defaultProps = {
  "rowHeight": 30,
  "tableWidth": 1000,
  "tableHeight": (typeof window !== "undefined") ? (window.innerHeight - 100) : 600
}
