/**
 * http request data serialize
 * @param params { object } 
 */
 export const serialize = <T extends Record<string, any>> (params: T): string => {
  let head = ''
  for (const key of Object.keys(params)) {
    head += head === '' ? '?' : '&'
    head += `${key}=${params[key]}`
  }
  return head
}