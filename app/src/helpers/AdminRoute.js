import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isAdmin = keycloak.authenticated && keycloak.hasRealmRole("admin");

 return isAdmin ? children : "Forbidden 403";
};

export default PrivateRoute;