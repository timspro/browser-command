# browser-command

```
npm install @tim-code/browser-command
```

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
