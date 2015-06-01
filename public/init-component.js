"use strict"

import React from "react"
import App from "./components/app"
import Flux from "./flux"
import FluxComponent from "flummox/component"


export default function initComponent (backend) {
  const flux = new Flux(backend)

  return flux.getActions("poll").load().then(() => (
    <FluxComponent flux={ flux } connectToStores={ ["poll"] }>
      <App />
    </FluxComponent>
  ))
}
