import { CookieOptions, SessionOptions } from 'express-session'

import sessionStore from '../redis'

const cookieOptions: CookieOptions = {
  maxAge: 100 * 60 * 60 * 24 * 365 * +(process.env.REDIS_COOKIE_MAX_YEARS || '10'),
  httpOnly: true, // disable cookie access on the client
  sameSite:
    process.env.NODE_ENV === 'development' &&
    process.env.CLIENT_NICKNAME === 'apollo-studio'
      ? 'none'
      : 'lax', // protection against CSRF
  secure:
    (
      process.env.NODE_ENV === 'development' &&
      process.env.CLIENT_NICKNAME === 'apollo-studio'
    ) ||
    (process.env.NODE_ENV === 'production')
}

const sessionOptions: SessionOptions = {
  name: 'qid',
  store: sessionStore,
  saveUninitialized: false,
  cookie: cookieOptions,
  secret:
    process.env.REDIS_SESSION_SECRET ||
    'dont-ever-think-this-would-be-the-real-secret',
  resave: false
}

export default sessionOptions
