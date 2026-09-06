import { useUser } from '../context/useUser'
import { Outlet, Navigate } from 'react-router-dom'

// Protect routes that require the user to be authenticated
export default function ProtectedRoute() {
  // Get the current user from the authentication context
  const { user } = useUser()

  // Redirect to the sign-in page if the user does not have a JWT token
  if (!user || !user.token) {
    return <Navigate to="/signin" replace />
  }

  // Render the protected child route when the user is authenticated
  return <Outlet />
}