import { CookieOptions, SessionOptions } from 'express-session'

import sessionStore from '../redis'
import * as ExpressSessionConstants from '../redis/constants/session'

const cookieOptions: CookieOptions = {
  maxAge: 100 * 60 * 60 * 24 * 365 * +(process.env.REDIS_COOKIE_MAX_YEARS || '10'),
  httpOnly: true, // disable cookie access on the client
  sameSite:
    process.env.INCLUDE_APOLLO_STUDIO === 'true'
      ? 'none'
      : 'lax', // protection against CSRF
  secure: process.env.LOCAL_HTTPS_SERVER === 'true'
}

const sessionOptions: SessionOptions = {
  name: ExpressSessionConstants.SESSION_COOKIE_NAME,
  store: sessionStore,
  saveUninitialized: false,
  cookie: cookieOptions,
  secret:
    process.env.REDIS_SESSION_SECRET ||
    'dont-ever-think-this-would-be-the-real-secret',
  resave: false
}

export default sessionOptions
