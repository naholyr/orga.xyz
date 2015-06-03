import React from "react"


export default class Nav extends React.Component {
  toggleTable() {
    this.props.flux.getActions("poll").toggleTable(this.props.showTable)
  }

  toggleReport() {
    this.props.flux.getActions("poll").toggleReport(this.props.showReport)
  }

  render() {
    return (
      <nav>
        <span>Afficher/Cacher:</span>
        <a
          className={ this.props.showTable ? "active" : "" }
          onClick={ () => this.toggleTable() }
          >
          Tableau
        </a>
        <a
          className={ this.props.showReport ? "active" : "" }
          onClick={ () => this.toggleReport() }
          >
          Liste
        </a>
      </nav>
    )
  }
}


