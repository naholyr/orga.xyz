"use strict"

import React from "react"
import App from "./components/app"
import Flux from "./flux"
import FluxComponent from "flummox/component"
import data from "../data.json"

const flux = new Flux()

flux.getStore("poll").setState(data)

React.render(
  <FluxComponent flux={ flux } connectToStores={ ['poll'] }>
    <App />
  </FluxComponent>
, document.getElementById("main"))
