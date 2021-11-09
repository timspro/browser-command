import { autotest } from "@tim-code/autotest"
import { make } from "./index.js"

const setup = () => {
  window.SILENT = true
}
// test server's port is randomly assigned and then browser-util finds out the port through process.env.PORT
autotest(make, { setup })("file:///serve.js", "root", { arg: "world" })("hello world")

const setupCookie = () => {
  document.cookie = "SERVE_BACKEND=http://localhost:4000; path=/;"
}
autotest(make, { setup: setupCookie, error: true })("file:///serve.js", "root", {
  arg: "world",
})(expect.objectContaining({ message: expect.stringMatching(/ECONNREFUSED/u) }))
