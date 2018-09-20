import jwt from 'jsonwebtoken'

// verify if token is valid
const isValidToken = (token) => {
  try {
    jwt.verify(token, process.env.SECRET_OR_KEY)
    return true
  } catch (error) {
    // error
    return false
  }
}

// retrieve token from header
const retrieveToken = (headers) => {
  if (headers && headers.authorization) {
    let tokens = headers.authorization.split(' ')
    if (tokens && tokens.length === 2) {
      return tokens[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

// auth utility helper
const AuthUtils = {
  isValidToken,
  retrieveToken,
}

export default AuthUtils