"use strict"

require("babel/register")()

var path = require("path")
var express = require("express")
var render = require("./render")
var backend = require("./backend")
var bodyParser = require("body-parser")
var session = require("express-session")
var RedisStore = require("connect-redis")(session)
var config = require("./config.json")


var app = module.exports = express()


// React routes
app.use(session({
  "store": new RedisStore(config),
  "secret": "KERMESSE",
  "resave": true,
  "saveUninitialized": false
}))
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
