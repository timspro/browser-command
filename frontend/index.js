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

/**
 * Forms a "back-end URL" by combing the calling filename with the origin.
 * @param {string} importMetaUrl import.meta.url - Used to get the filename of the calling file
 * @returns
 */
export function url(importMetaUrl) {
  const filename = importMetaUrl.split("/").pop()
  const base = filename.split(".").shift()
  const origin = cookie.get(base) || location.origin
  return `${origin}/${base}`
}

/**
 * Forms a "back-end URL" by combing the calling filename with the origin and urlPath.
 * @param {string} importMetaUrl import.meta.url - Used to get the filename of the calling file
 * @param {string} urlPath
 * @returns {string}
 */
export function getFullUrl(importMetaUrl, urlPath) {
  return `${url(importMetaUrl)}/${urlPath}`
}

/**
 *
 * @param {string} importMetaUrl import.meta.url - Used to get the filename of the calling file
 * @param {Object} $1
 * @param {Object} $1.method Method used to communicate with backend.
 * @param {Object} $1.unbox Key that contains data in backend response.
 * @param {Object} $1.defaults UNUSED? - Another way of specifying defaults for post body or get parameters
 * @returns {Function} fetch-like function with arguments (urlPath, requestData, options)
 */
export function fetchFactory(
  importMetaUrl,
  { method = "post", unbox = "result", defaults = {} } = {}
) {
  return async (
    urlPath,
    requestData = {},
    { fetchOptions = {}, silent = false, maxLength = false } = {}
  ) => {
    const fullUrl = getFullUrl(importMetaUrl, urlPath)
    const boxed = await json[method](fullUrl, { ...defaults, ...requestData }, fetchOptions)
    const result = typeof unbox === "string" ? boxed[unbox] : boxed
    return log(result, { silent, maxLength })
  }
}

export const factory = fetchFactory
