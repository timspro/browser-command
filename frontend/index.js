import { cookie, json } from "@tim-code/browser-util"

export function log(data) {
  if (!window.SILENT) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  return data
}

export function make(name, importMetaUrl, { defaults = {}, forced = {} } = {}) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  return async (postData) => {
    const origin = cookie.get(`${base.toUpperCase()}_BACKEND`) || ""
    const { result } = await json.post(`${origin}/${base}/${name}`, {
      ...defaults,
      ...postData,
      ...forced,
    })
    return log(result)
  }
}
