import { useEffect, useState } from "react";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { apiUrl } from "../constans/environment";

const Secured = () => {
  const [protectedMessage, setProtectedMessage] = useState("");

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/hello`).then((res) => {
      setProtectedMessage(res.data);
      console.log("RESPONSE", res, apiUrl)
    }
    ).catch((e) => console.log("ERROR", e));
  }, [])

 return (
   <div>
     <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
     <p>Protected message: {protectedMessage}</p>
   </div>
 );
};

export default Secured;