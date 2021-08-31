
export default function unflatten<T> (o: object) {
  const final = {}
  const keys = Object.keys(o)
  for (const key of keys) {
    const paths = key.split('.')
    const finalPath = paths[paths.length - 1]
    const value = o[key]
    let finalRef = final
    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i]
      if (path !== finalPath) { if (!(path in finalRef)) finalRef[path] = {} }
      finalRef = finalRef[path]
    }
    finalRef[finalPath] = value
  }
  return final as T
}
