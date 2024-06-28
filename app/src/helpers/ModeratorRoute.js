import { useKeycloak } from "@react-keycloak/web";

const ModeratorRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isAdmin = keycloak.authenticated && keycloak.hasResourceRole("admin", "my-api");

 return (isAdmin ? children : "This page requires moderator role!")
};

export default ModeratorRoute;