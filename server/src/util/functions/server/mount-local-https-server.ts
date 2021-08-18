import fs from 'fs'
import https from 'https'
import path from 'path'

import express from 'express'

import { CreateAppTuple } from '../../../types/app'

const mountLocalHttpsServer = (app: express.Application): CreateAppTuple => {
  const key = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'ssl', 'development', 'apollo-studio', 'key.pem'), 'utf8')
  const cert = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'ssl', 'development', 'apollo-studio', 'server.crt'), 'utf8')
  const httpsServer = https.createServer({ key, cert }, app)
  return [httpsServer, undefined]
}

export default mountLocalHttpsServer
