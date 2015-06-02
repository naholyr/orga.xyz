"use strict"

import React from "react"
import App from "./components/app"
import Flux from "./flux"
import FluxComponent from "flummox/component"


export default function initComponent (backend, initialData) {
  const flux = new Flux(backend)

  var dataReady
  if (initialData) {
    // Local cache
    flux.getStore("poll").setState(initialData)
    dataReady = Promise.resolve(initialData)
  } else {
    // Load from API
    dataReady = flux.getActions("poll").load()
  }

  return dataReady.then(() => (
    <FluxComponent flux={ flux } connectToStores={ ["poll"] }>
      <App />
    </FluxComponent>
  ))
}
