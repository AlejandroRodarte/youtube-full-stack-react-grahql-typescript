import fs from 'fs'
import https from 'https'
import path from 'path'

import express from 'express'

import { AppTuples } from '../../../types/app'

const mountHttpsServer = (app: express.Application): AppTuples.CreateAppTuple => {
  const key = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'ssl',
      process.env.NODE_ENV!,
      process.env.SSL_SUBPATH!,
      'key.pem'
    ),
    'utf8'
  )

  const cert = fs.readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'ssl',
      process.env.NODE_ENV!,
      process.env.SSL_SUBPATH!,
      'server.crt'
    ),
    'utf8'
  )

  const httpsServer = https.createServer(
    {
      key,
      cert
    },
    app
  )

  return [
    httpsServer,
    undefined
  ]
}

export default mountHttpsServer
