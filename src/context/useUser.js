import { useContext } from 'react'
import { UserContext } from './UserContext'

// Custom hook for accessing the user authentication context
export const useUser = () => {
  return useContext(UserContext)
}