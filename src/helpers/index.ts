export const objToQs = (query?: Record<string, unknown>): string => {
  if (!query) {
    return ''
  }

  const q = query

  const qs = Object.keys(q)
    .map((key: string) => {
      if (q[key] || q[key] === 0) {
        return `${key}=${q[key]}`
      }
      return ''
    })
    .filter((val) => val)
    .join('&')
  return qs.length > 0 ? `?${qs}` : ''
}

export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  if (!obj) return true
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
