import { FieldInfo, Cache } from '@urql/exchange-graphcache'

const handleInvalidateAllMode = (queriesInfo: FieldInfo[], cache: Cache) => {
  const fieldInfos = queriesInfo.filter((info) => info.fieldName === 'posts')

  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'posts', fieldInfo.arguments)
  })
}

export default handleInvalidateAllMode
