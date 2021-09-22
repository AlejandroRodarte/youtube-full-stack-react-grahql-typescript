import { ExpressContext } from 'apollo-server-express'
import { Connection } from 'typeorm'

import redisClient from '../../redis/redis-client'
import dataloader from '../../cache/dataloader'
import { GraphQLContext } from '../../types/graphql'

const generateContext: (expressContext: ExpressContext, orm: Connection) => GraphQLContext.ApplicationContext = ({ req, res }, orm): GraphQLContext.ApplicationContext => ({
  req,
  res,
  redis: redisClient,
  db: orm,
  dataloader: {
    objects: {
      entities: {
        user: {
          byId: dataloader.objects.entities.user.byId()
        },
        post: {
          withTrendingScore: {
            byId: dataloader.objects.entities.post.withTrendingScore.byId(),
            byOriginalPosterId: dataloader.objects.entities.post.withTrendingScore.byOriginalPosterId()
          }
        },
        updoot: {
          byPostId: dataloader.objects.entities.updoot.byPostId(),
          byUserId: dataloader.objects.entities.updoot.byUserId(),
          byPrimaryKey: dataloader.objects.entities.updoot.byPrimaryKey()
        }
      }
    }
  }
})

export default generateContext
