import AppRoutes from './routes';
import { useCurrentUser } from './hooks/auth/useCurrentUser';
import './App.css';

function App() {
  // Initialize current user state on app mount
  useCurrentUser();

  return <AppRoutes />;
}

export default App;
