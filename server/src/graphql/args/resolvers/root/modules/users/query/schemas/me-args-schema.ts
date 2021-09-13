import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'

interface MeArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {}

const MeArgsSchema =
  Joi
    .object<MeArgsSchemaInterface>()
    .keys({ namespace: commonPrimitives.namespaceSchema })

export default MeArgsSchema
