import { Client } from 'urql'

import { MeDocument, MyStatusQuery, MyStatusQueryVariables } from '../../../../../generated/graphql'

const checkMyStatusCode: (client: Client, code: number) => Promise<[boolean | undefined, Error | undefined]> = async (client, code) => {
  try {
    const result = await client.query<MyStatusQuery, MyStatusQueryVariables>(MeDocument).toPromise()
    return [result.data.me.status === code, undefined]
  } catch (e) {
    return [undefined, e as Error]
  }
}

export default checkMyStatusCode
