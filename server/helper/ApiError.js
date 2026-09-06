// Custom error class for API errors.
// Extends the built-in Error class with an HTTP status code.
class ApiError extends Error {

  constructor(message, status) {
    // Pass the error message to the parent Error class
    super(message)

    // Store the HTTP status code, for example 400 or 401
    this.status = status
  }

}

export { ApiError }