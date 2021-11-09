import { cookie, json } from "@tim-code/browser-util"

export function log(data) {
  if (!window.SILENT) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return data
}

export async function make(importMetaUrl, commandName, postData) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  const cookieName = `${base.toUpperCase()}_BACKEND`
  const origin = cookie.get(cookieName) || ""
  const { result } = await json.post(`${origin}/${base}/${commandName}`, postData)
  return log(result)
}

export function factory(importMetaUrl, { defaults = {}, overrides = {} } = {}) {
  return (commandName, postData) =>
    make(importMetaUrl, commandName, { ...defaults, ...postData, ...overrides })
}
