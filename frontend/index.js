import { cookie, json } from "@tim-code/browser-util"

function shorten(string, maxLength) {
  if (string.length > maxLength) {
    const shortened = string.substring(0, maxLength)
    return `${shortened}...`
  }
  return string
}

export function log(data, { maxLength, silent = false } = {}) {
  if (!silent && !window.SILENT) {
    if (typeof data === "string" && maxLength) {
      data = shorten(data, maxLength)
    }
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return data
}

export function url(importMetaUrl) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  const origin = cookie.get(base) || location.origin
  return `${origin}/${base}`
}

export function getUrl(importMetaUrl, commandName) {
  return `${url(importMetaUrl)}/${commandName}`
}

export function factory(
  importMetaUrl,
  { method = "post", unbox = "result", defaults = {} } = {}
) {
  return async (commandName, requestData = {}, { silent = false, maxLength = false } = {}) => {
    const fullUrl = getUrl(importMetaUrl, commandName)
    const boxed = await json[method](fullUrl, {
      ...defaults,
      ...requestData,
    })
    const result = typeof unbox === "string" ? boxed[unbox] : boxed
    return log(result, { silent, maxLength })
  }
}
