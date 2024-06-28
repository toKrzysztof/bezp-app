import { useEffect, useState } from "react";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { apiUrl } from "../constans/environment";
import ModeratorFansList from "../components/ModeratorFansList";

const ModeratorPage = () => {
  const [fans, setFans] = useState([]);

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/fans`).then((res) => {
      setFans(res.data);
      console.log("RESPONSE", res, apiUrl);
    }
    ).catch((e) => console.log("ERROR", e));
  }, [])

 return (
  <div>
    <ModeratorFansList fans={fans} setFans={setFans}/>
  </div>
 );
};

export default ModeratorPage;