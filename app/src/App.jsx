import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import AdminPage from "./pages/Adminpage"
import ModeratorRoute from "./helpers/ModeratorRoute";
import ModeratorPage from "./pages/Moderatorpage";
import './App.css';
import FansListPage from "./pages/FansListPage.jsx";
import { SpotifyStatsPage } from "./pages/SpotifyStats.jsx";


function App() {
 return (
   <div className="center">
     <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route
              path="/fans-list"
              element={
                <PrivateRoute>
                  <FansListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route
              path="/moderator"
              element={
                <ModeratorRoute>
                  <ModeratorPage />
                </ModeratorRoute>
              }
            />
            <Route
              path="/tf-stats"
              element={
                <PrivateRoute>
                  <SpotifyStatsPage />
                </PrivateRoute>
              }
            />
          </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;