import { useKeycloak } from "@react-keycloak/web";

export function Login() {
  const { keycloak, initialized } = useKeycloak();

return <div>
    {!keycloak.authenticated && (
      <button
        type="button"
        className="text-blue-800"
        onClick={() => keycloak.login()}
      >
        Login
      </button>
    )}

    {!!keycloak.authenticated && (
      <button
        type="button"
        className="text-blue-800"
        onClick={() => keycloak.logout()}
      >
        Logout ({keycloak.tokenParsed.preferred_username})
      </button>
    )}
</div>
}