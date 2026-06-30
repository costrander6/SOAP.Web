import { useState, useEffect } from 'react'
import { AuthUser, getCurrentUser } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'
import { getAllRepoMainResults } from './api/soapClient'
import { MultipleRepoRuns } from "./models/MultipleRepoRuns";
import AllRepoRunResults from './features/allRepoRunResults/AllRepoRunResults';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [findings, setFindings] = useState<MultipleRepoRuns | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        setUser(user);
        setLoading(false);
        return getAllRepoMainResults();
      })
      .then(setFindings)
      .catch(err => {
        if (err.name === 'UserUnAuthenticatedException') {
          navigate('/login')
        } else {
          console.error(err)
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (!user || loading || !findings) return null;

  return (
  <AllRepoRunResults data={findings}/>
  )
}

export default App
