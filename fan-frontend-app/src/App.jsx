import { ReactKeycloakProvider } from "@react-keycloak/web";
import './App.css'
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { SpotifyStatsPage } from "./pages/SpotifyStatsPage";
import { Login } from "./components/Login";

function App() {

  return (
    <div className="center">
      <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute><SpotifyStatsPage /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
        <Login/>
      </ReactKeycloakProvider>
    </div>
  )
}

export default App
