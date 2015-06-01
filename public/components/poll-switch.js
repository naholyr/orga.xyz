"use strict"

import React from "react"


export default class PollSwitch extends React.Component {
  static propTypes = {
    "selected": React.PropTypes.bool,
    "who": React.PropTypes.string.isRequired,
    "onToggle": React.PropTypes.func
  }

  static defaultProps = {
    "selected": false,
    "onToggle": () => {}
  }

  constructor(props) {
    super(props)

    this.state = {
      "selected": props.selected
    }
  }

  toggle() {
    const selected = !this.state.selected

    this.setState({ selected: selected })

    this.props.onToggle(selected, this.props.who)
  }

  render() {
    const label = this.state.selected ? this.props.who : " "

    return (
      <button
        disabled={ !this.props.enabled }
        title={ this.props.who }
        onClick={ () => this.toggle() }
        >
        { label }
      </button>
    )
  }
}
