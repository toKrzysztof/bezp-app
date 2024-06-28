import { useEffect, useState } from "react";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { apiUrl } from "../constans/environment";
import FansList from "../components/FansList";

const FansListPage = () => {
  const [fans, setFans] = useState([]);

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/fans`).then((res) => {
      setFans(res.data);
      console.log("RESPONSE", res, apiUrl);
    }
    ).catch((e) => console.log("ERROR", e));
  }, [])

 return <FansList fans={fans} setFans={setFans}/>
};

export default FansListPage;