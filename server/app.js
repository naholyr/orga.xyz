import path from "path"
import express from "express"
import render from "./render"
import backend from "./backend"
import bodyParser from "body-parser"
import session from "express-session"
import redisSession from "connect-redis"
import config from "./config.json"


export default app


const RedisStore = redisSession(session)
const port = process.env.PORT || config.port || 8000
const app = express()

// React routes
app.use(session({
  "store": new RedisStore({...config.redis, ...config.session}),
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

console.log("Starting server on port", port)
app.listen(port, () => console.log("Server ready, listening on port", port))
