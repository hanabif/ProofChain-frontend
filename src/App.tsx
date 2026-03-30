import { useEffect } from 'react';
import AppRoutes from './routes';
// import { useCurrentUser } from './hooks/auth/useCurrentUser';
import { useAuthStore } from './store/authStore';
import { Toaster } from './components/ui/Toast';
import { webSocketService } from './services/websocketService';
import './App.css';

function App() {
  const { token } = useAuthStore();
  
  useEffect(() => {
    if (token) {
      webSocketService.connect();
    } else {
      webSocketService.disconnect();
    }

    return () => {
      webSocketService.disconnect();
    };
  }, [token]);

  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
