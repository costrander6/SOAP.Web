import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hub } from 'aws-amplify/utils'

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      if (payload.event === 'signedIn') {
        navigate('/');
      }
    });
    return unsubscribe;
  }, [navigate]);

  return null;
}