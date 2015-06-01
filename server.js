"use strict"

var path = require("path")
var express = require("express")
var render = require("./lib/render")

var app = module.exports = express()

app.get("/", render.middleware)

app.use(express.static(path.join(__dirname, "public")))

app.listen(process.env.PORT || 8000)
