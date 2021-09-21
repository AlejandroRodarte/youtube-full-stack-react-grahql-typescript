import { Resolver, FieldResolver, Root } from 'type-graphql'

import PostDto from '../../../../objects/dtos/posts/post-dto'

@Resolver(PostDto)
export default class PostDtoTextSnippetResolver {
  @FieldResolver(() => String)
  textSnippet (
    @Root() root: PostDto
  ) {
    if (root.text.length <= 50) return root.text
    return `${root.text.slice(0, 50)}...`
  }
}
