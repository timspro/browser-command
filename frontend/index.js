import { cookie, json } from "@tim-code/browser-util"

export function log(data) {
  if (!window.SILENT) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return data
}

export function make(commandName, importMetaUrl, { defaults = {}, overrides = {} } = {}) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  return async (postData) => {
    const cookieName = `${base.toUpperCase()}_BACKEND`
    const origin = cookie.get(cookieName) || ""
    const { result } = await json.post(`${origin}/${base}/${commandName}`, {
      ...defaults,
      ...postData,
      ...overrides,
    })
    return log(result)
  }
}
