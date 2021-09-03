import { Client } from 'urql'

import { MyStatusQuery, MyStatusQueryVariables, MyStatusDocument } from '../../../../../generated/graphql'

const checkMyStatusCode: (client: Client, code: number) => Promise<[boolean | undefined, Error | undefined]> = async (client, code) => {
  try {
    const result = await client.query<MyStatusQuery, MyStatusQueryVariables>(MyStatusDocument).toPromise()
    return [result.data.me.status === code, undefined]
  } catch (e) {
    return [undefined, e as Error]
  }
}

export default checkMyStatusCode
