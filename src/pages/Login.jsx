import { signInWithRedirect } from 'aws-amplify/auth'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    signInWithRedirect()
  }, [])

  return null
}