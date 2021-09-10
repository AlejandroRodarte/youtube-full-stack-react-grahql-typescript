import { Resolver, FieldResolver, Root } from 'type-graphql'

import Post from '../../../../../db/orm/entities/Post'

@Resolver(Post)
export default class TextSnippetResolver {
  @FieldResolver(() => String)
  textSnippet (
    @Root() root: Post
  ) {
    if (root.text.length <= 50) return root.text
    return `${root.text.slice(0, 50)}...`
  }
}
