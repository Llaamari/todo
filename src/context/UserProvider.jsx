import { useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

// Provides user authentication state and functions to the application
export default function UserProvider({ children }) {

  // Restore the logged-in user from session storage if available
  const userFromStorage = sessionStorage.getItem('user')

  // Store the current user and authentication information
  const [user, setUser] = useState(
    userFromStorage
      ? JSON.parse(userFromStorage)
      : { email: '', password: '' }
  )

  // Register a new user through the backend API
  const signUp = async () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signup`,
      JSON.stringify({ user: user }),
      headers
    )

    // Clear the form data after successful registration
    setUser({ email: '', password: '' })
  }

  // Authenticate the user through the backend API
  const signIn = async () => {
    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/signin`,
      JSON.stringify({ user: user }),
      headers
    )

    // Store the authenticated user and JWT token in the state
    setUser(response.data)

    // Keep the user logged in during the current browser session
    sessionStorage.setItem(
      'user',
      JSON.stringify(response.data)
    )
  }

  // Make the user state and authentication functions
  // available to child components
  return (
    <UserContext.Provider
      value={{ user, setUser, signUp, signIn }}
    >
      {children}
    </UserContext.Provider>
  )
}