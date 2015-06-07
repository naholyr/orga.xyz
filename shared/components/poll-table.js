"use strict"

import React from "react"
import PollSwitch from "./poll-switch"
import Flux from "../flux"
import map from "lodash/collection/map"


export default class PollTable extends React.Component {
  static propTypes = {
    "flux": React.PropTypes.instanceOf(Flux).isRequired,
    "who": React.PropTypes.string.isRequired,
    "hours": React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    "workshops": React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    "selections": React.PropTypes.arrayOf(React.PropTypes.shape({
      "workshop": React.PropTypes.string.isRequired,
      "hour": React.PropTypes.string.isRequired,
      "who": React.PropTypes.string.isRequired
    })).isRequired
  }

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
        { map(this.props.hours, (h, j) => this.renderCell(i, j)) }
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
          who={ this.props.who }
          flux={ this.props.flux }
        />
      </td>
    )
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th rowSpan={ 2 }>Ateliers</th>
            <th colSpan={ this.props.hours.length }>Tranches horaires</th>
          </tr>
          <tr>
            { map(this.props.hours, (_, i) => this.renderHourHeaderCell(i)) }
          </tr>
        </thead>
        <tbody>
          { map(Object.keys(this.props.workshops), (_, i) => this.renderRow(i)) }
        </tbody>
      </table>
    );
  }
}
