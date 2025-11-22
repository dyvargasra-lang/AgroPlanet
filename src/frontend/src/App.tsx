import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routes } from './app/routes';
import { useAuthStore } from './store/authStore';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;

