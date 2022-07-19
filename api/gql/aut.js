import jwt from 'jsonwebtoken'

import { SECRET, ROLES } from './config'
import cookieSession from 'cookie-session'


export function createToken({ id, role } = {}) {
  // eslint-disable-next-line no-undef
  log(`create token with user id ${id}`)
  return id && role && jwt.sign({ userId: id, role }, SECRET)
}

export function decodeToken(token) {
  return jwt.verify(token, SECRET)
}

export function isLoggedIn({ role }) {
  return !!Object.values(ROLES).find(existingRole => existingRole === role)
}

export function canEditChannel({ role }) {
  return role === ROLES.operator || role === ROLES.admin
}



function loadSessionData(req) {
  if (req.session && req.session.token) {
    return new Promise((resolve) => {
      let tokenData = null
      try {
        tokenData = decodeToken(req.session.token)
      } catch (err) {
        // eslint-disable-next-line no-undef
        log(err)
      }
      resolve(tokenData)
    })
  }

  return new Promise((resolve) => {
    resolve(null)
  })
}

function getSessionData(req, res, next) {
  loadSessionData(req)
    .then((tokenData) => {
      req.tokenData = tokenData || {}
      next()
    })
    .catch(() => {
      res.sendStatus(400)
    })
}

const cookieMiddleware = cookieSession({
  name: 'session',
  keys: ['id', 'token'],
})

export default (req, res, next) => {
  cookieMiddleware(req, res, () => getSessionData(req, res, next))
}