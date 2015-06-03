"use strict"

import path from "path"
import fsp from "fsp"
import React from "react"
import initComponent from "../shared/init-component"
import backend from "./backend"


export default function render (url, staticMarkup) {
  return Promise.all([
    initComponent(backend),
    fsp.readFileP(path.join(__dirname, "..", "public", "index.html"), {"encoding": "utf8"})
  ])
  .then(([component, page]) => {
    const data = component.props.flux.getStore("poll").state
    const html = staticMarkup ? React.renderToStaticMarkup(component) : React.renderToString(component)
    return page
      .replace(/<!-- APP HERE -->/, html)
      .replace(/<!-- DATA HERE -->/, "window.POLL_DATA=" + JSON.stringify(data))
  })
}

export function middleware (req, res) {
  render(req.url, req.query.static)
  .then(html => res.status(200).send(html))
  .catch(err => res.status(500).send(err.stack))
}
