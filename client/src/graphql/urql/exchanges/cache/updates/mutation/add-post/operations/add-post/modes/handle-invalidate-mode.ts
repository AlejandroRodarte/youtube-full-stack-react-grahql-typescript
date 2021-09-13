import { FieldInfo, Cache } from '@urql/exchange-graphcache'

const handleInvalidateMode = (queriesInfo: FieldInfo[], cache: Cache) => {
  const fieldInfos = queriesInfo.filter((info) => info.fieldName === 'posts')

  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'posts', fieldInfo.arguments)
  })
}

export default handleInvalidateMode
