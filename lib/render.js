"use strict"

var path = require("path")
var fsp = require("fsp")
var React = require("react")
var FluxComponent = require("flummox/component")
var data = require("../data.json")

require("babel/register")()

var App = require("../public/components/app")
var Flux = require("../public/flux")

module.exports = render


function render (url) {
  var flux = new Flux()

  flux.getStore("poll").setState(data)

  var app = React.createElement(App, null)
  var props = {
    "flux": flux,
    "connectToStores": ["poll"]
  }
  var root = React.createElement(FluxComponent, props, app)

  var html = React.renderToString(root)

  return fsp.readFileP(path.join(__dirname, "..", "public", "index.html"), {"encoding": "utf8"})
    .then(function (page) {
      return page.replace(/<!-- APP HERE -->/, html)
    })
}

render.middleware = function (req, res) {
  render(req.url)
  .then(function (html) {
    res.status(200).send(html)
  })
  .catch(function (err) {
    res.status(500).send(err.message)
  })
}
