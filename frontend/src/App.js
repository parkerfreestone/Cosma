import { Router } from "./components/Router";
import { AuthProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
