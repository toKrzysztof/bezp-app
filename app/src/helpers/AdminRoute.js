import { useKeycloak } from "@react-keycloak/web";

const AdminRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isAdmin = keycloak.authenticated && keycloak.hasResourceRole("admin", "my-api");
//  console.log(keycloak.resourceAccess)

 return (isAdmin ? children : "This page requires administrator role!")
};

export default AdminRoute;