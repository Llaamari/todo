import jwt from 'jsonwebtoken'

const { verify } = jwt

// Middleware for protecting routes that require authentication
const auth = (req, _res, next) => {

  // Read the Authorization header and separate the scheme and token
  // Expected format: "Bearer <token>"
  const [scheme, token] = req.get('authorization')?.split(' ') || []

  // Reject the request if the Bearer token is missing
  if (scheme !== 'Bearer' || !token) {
    const error = new Error('Authentication required')
    error.status = 401
    return next(error)
  }

  try {
    // Verify the JWT using the secret key and store its data in the request
    req.user = verify(token, process.env.JWT_SECRET_KEY)

    // Continue to the protected route
    return next()
  } catch {
    // Reject invalid or expired tokens
    const error = new Error('Invalid or expired token')
    error.status = 401
    return next(error)
  }

}

export { auth }