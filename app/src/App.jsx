import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import AdminPage from "./pages/Adminpage"

function App() {
 return (
   <div>
     <ReactKeycloakProvider authClient={keycloak}>
       <Nav />
       <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<WelcomePage />} />
           <Route
             path="/secured"
             element={
               <PrivateRoute>
                 <SecuredPage />
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
         </Routes>
       </BrowserRouter>
     </ReactKeycloakProvider>
   </div>
 );
}

export default App;