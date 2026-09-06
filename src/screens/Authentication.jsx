import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser"

// Define the available authentication modes
export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

// Component used for both signing in and signing up
export default function Authentication({ authenticationMode }) {
  // Get user data and authentication functions from the user context
  const { user, setUser, signUp, signIn } = useUser()

  // Used for navigating to another route after authentication
  const navigate = useNavigate()

  // Handle the authentication form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Choose the correct function depending on the current authentication mode
    const signFunction =
      authenticationMode === AuthenticationMode.SignUp
        ? signUp
        : signIn

    signFunction()
      .then(() => {
        // After sign-up go to sign-in,
        // and after sign-in go to the Todo page
        navigate(
          authenticationMode === AuthenticationMode.SignUp
            ? '/signin'
            : '/'
        )
      })
      .catch(error => {
        // Show an error if authentication fails
        alert(error)
      })
  }

  return (
    <div className="auth-card">
      <h1>
        {authenticationMode === AuthenticationMode.SignIn
          ? 'Sign in'
          : 'Sign up'}
      </h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          placeholder="Email"
          value={user.email}
          onChange={e =>
            setUser({
              ...user,
              email: e.target.value
            })
          }
        />

        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={e =>
            setUser({
              ...user,
              password: e.target.value
            })
          }
        />

        <button type="submit">
          {authenticationMode === AuthenticationMode.SignIn
            ? 'Login'
            : 'Sign up'}
        </button>

        {/* Switch between the sign-in and sign-up pages */}
        <Link
          className="auth-link"
          to={
            authenticationMode === AuthenticationMode.SignIn
              ? '/signup'
              : '/signin'
          }
          onClick={() =>
            setUser({
              email: '',
              password: ''
            })
          }
        >
          {authenticationMode === AuthenticationMode.SignIn
            ? 'No account? Sign up'
            : 'Already signed up? Sign in'}
        </Link>
      </form>
    </div>
  )
}