import { autotest } from "@tim-code/autotest"
import * as command from "./index.js"

// base corresponds to filename in test-server
const base = "serve"
const filename = `file:///${base}.js`

const setup = () => {
  window.SILENT = true
}
// test server's port is randomly assigned and then browser-util finds out the port through process.env.PORT
autotest(command.post, { setup })(filename, "root", { arg: "world" })("hello world")
autotest(command.get, { setup })(filename, "root", { arg: "world" })("hello world")
autotest(command.factory(filename), { setup })("root", { arg: "world" })("hello world")

const setupCookie = () => {
  document.cookie = `${base}=http://localhost:0; path=/;`
}
autotest(command.post, { setup: setupCookie, error: true })(filename, "root", {
  arg: "world",
})(expect.objectContaining({ message: expect.stringMatching(/ECONNREFUSED/u) }))
