import { cookie, json } from "@tim-code/browser-util"

function shorten(string, max = 100) {
  if (string.length > max) {
    const shortened = string.substring(0, max)
    return `${shortened}...`
  }
  return string
}

export function log(data) {
  if (!window.SILENT) {
    if (typeof data === "string") {
      data = shorten(data)
    }
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return data
}

export function url(importMetaUrl) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  const origin = cookie.get(base) || ""
  return `${origin}/${base}`
}

export function factory(
  importMetaUrl,
  { method = "post", defaults = {}, overrides = {} } = {}
) {
  return async (commandName, requestData = {}) => {
    const fullUrl = `${url(importMetaUrl)}/${commandName}`
    const { result } = await json[method](fullUrl, {
      ...defaults,
      ...requestData,
      ...overrides,
    })
    return log(result)
  }
}

export function post(importMetaUrl, commandName, body) {
  return factory(importMetaUrl, { method: "post" })(commandName, body)
}

export function get(importMetaUrl, commandName, query) {
  return factory(importMetaUrl, { method: "get" })(commandName, query)
}

export function request(importMetaUrl, commandName, options) {
  return factory(importMetaUrl, { method: "request" })(commandName, options)
}
