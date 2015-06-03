"use strict"

import React from "react"
import sort from "lodash/collection/sortByAll"


export default class PollReport extends React.Component {
  renderSelection(selection) {
    const workshopLabel = this.props.workshops[selection.workshop]
    const hours = selection.hour.split("-")
    const hour = "de " + hours[0] + " à " + hours[1]
    const key = selection.workshop + "/" + selection.hour

    return <li key={ key }><strong>{ workshopLabel }</strong> { hour } avec <em>{ selection.who }</em></li>
  }

  render() {
    const selections = sort(this.props.selections, ["workshop", "hour"])

    if (!selections.length) {
      return <p>Aucune sélection</p>
    }

    return <ul>{ selections.map(s => this.renderSelection(s)) }</ul>
  }
}
