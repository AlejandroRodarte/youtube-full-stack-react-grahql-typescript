import Joi from 'joi'

import { GraphQLArgs } from '../../../../../../../../types/graphql'

import commonPrimitives from '../../../../../../common/primitive'

interface LogoutArgsSchemaInterface extends GraphQLArgs.NamespaceSchema {}

const LogoutArgsSchema =
  Joi
    .object<LogoutArgsSchemaInterface>()
    .keys({ namespace: commonPrimitives.namespaceSchema })

export default LogoutArgsSchema
