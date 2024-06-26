import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isAdmin = keycloak.authenticated && keycloak.hasResourceRole("admin", "my-api");
//  console.log(keycloak.resourceAccess)

 return (isAdmin ? children : "forbidden 403")
};

export default PrivateRoute;