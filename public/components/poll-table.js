"use strict"

import React from "react"
import PollSwitch from "./poll-switch"
import {branch} from "baobab-react/higher-order"


export default class PollTable extends React.Component {
  static propTypes = {
    "scrollTop": React.PropTypes.number,
    "scrollLeft": React.PropTypes.number,
    "rowHeight": React.PropTypes.number,
    "tableWidth": React.PropTypes.number,
    "tableHeight": React.PropTypes.number,
    "who": React.PropTypes.string.isRequired
  }

  static defaultProps = {
    "rowHeight": 30,
    "tableWidth": 1000,
    "tableHeight": (typeof window !== "undefined") ? (window.innerHeight - 100) : 600
  }

  constructor(props) {
    super(props)

    this.state = {
      "workshops": {
        "foot": "Football",
        "maquillage": "Maquillage",
        "peche-ligne": "Pêche à la ligne"
      },
      "hours": [
        "10-11",
        "11-12",
        "14-15",
        "15-16"
      ],
      "selects": {
        "foot/10-11": "Bob Morane",
        "foot/11-12": "John Doe",
        "peche-ligne/10-11": "John Doe"
      }
    }
  }

  renderHourHeaderCell(i) {
    const hour = this.state.hours[i]

    return <th key={ "th:hour:" + hour }>{ hour }</th>
  }

  getWorkshopIndex(i) {
    return Object.keys(this.state.workshops)[i]
  }

  getWorkshopLabel(i) {
    return this.state.workshops[this.getWorkshopIndex(i)]
  }

  renderRow(i) {
    return (
      <tr key={ "tr:" + i }>
        <th>{ this.getWorkshopLabel(i) }</th>
        { this.state.hours.map((h, j) => this.renderCell(i, j)) }
      </tr>
    )
  }

  onToggle(rowIndex, hourIndex, selected, who) {
    const hour = this.state.hours[hourIndex]
    const workshop = this.getWorkshopIndex(rowIndex)
    const key = workshop + "/" + hour

    this.state.selects[key] = selected ? who : null
  }

  renderCell(rowIndex, hourIndex) {
    const hour = this.state.hours[hourIndex]
    const workshop = this.getWorkshopIndex(rowIndex)
    const key = workshop + "/" + hour
    const person = this.state.selects[key] || this.props.who

    return (
      <td key={ key }>
        <PollSwitch
          selected={ Boolean(person) }
          who={ person }
          enabled={ this.props.who && person === this.props.who }
          onToggle={ (selected, who) => this.onToggle(rowIndex, hourIndex, selected, who) }
        />
      </td>
    )
  }

  render() {
    const controlledScrolling = this.props.left !== undefined || this.props.top !== undefined
    const hours = this.state.hours

    return (
      <table>
        <thead>
          <tr>
            <th rowSpan={ 2 }>Ateliers</th>
            <th colSpan={ this.state.hours.length }>Tranches horaires</th>
          </tr>
          <tr>
            { this.state.hours.map((_, i) => this.renderHourHeaderCell(i)) }
          </tr>
        </thead>
        <tbody>
          { Object.keys(this.state.workshops).map((_, i) => this.renderRow(i)) }
        </tbody>
      </table>
    );
  }
}
