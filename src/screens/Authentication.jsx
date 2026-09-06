import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser"

export const AuthenticationMode = Object.freeze({
  SignIn: 'Login',
  SignUp: 'SignUp'
})

export default function Authentication({ authenticationMode }) {
  const { user, setUser, signUp, signIn } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const signFunction =
      authenticationMode === AuthenticationMode.SignUp
        ? signUp
        : signIn

    signFunction()
      .then(() => {
        navigate(
          authenticationMode === AuthenticationMode.SignUp
            ? '/signin'
            : '/'
        )
      })
      .catch(error => {
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