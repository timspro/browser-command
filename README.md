# browser-command

```
npm install @tim-code/browser-command
```

A companion library to `gateway`, this allows for backend endpoints to be called almost as if they were functions.

## Philosophy

```js
import * as command from "@tim-code/autotest"

// note this filename needs to correspond to backend cookie/endpoint (i.e. "fs")
// alternatively can just pass string instead of "import.meta.url"
// command.post("fs", "root")
command.post(import.meta.url, "root")
command.get(import.meta.url, "root")
command.request(import.meta.url, "root")
command.factory(import.meta.url)("root")
```

## Typeical Usage

From `web-service`:

```js
const run = command.factory(import.meta.url)

export function fetch(url, options = {}) {
  return run("fetch", { url, options })
}
```
