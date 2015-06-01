"use strict"

require("babel/register")()

var path = require("path")
var express = require("express")
var render = require("./render")
var backend = require("./backend")
var bodyParser = require("body-parser")


var app = module.exports = express()


// React routes
app.get("/", render.middleware)

// Static server
app.use(express.static(path.join(__dirname, "..", "public")))

// HTTP API
app.use(bodyParser.json())
app.get("/data", backend.middleware(backend.load))
app.put("/session", backend.middleware(backend.updateSession))
app.delete("/selections", backend.middleware(backend.removeSelection))
app.post("/selections", backend.middleware(backend.addSelection))

app.listen(process.env.PORT || 8000)
