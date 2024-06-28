import { useEffect, useState } from "react";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { apiUrl } from "../constans/environment";
import FanCounter from "../components/FanCounter";

const FanCounterPage = () => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/counter`).then((res) => {
      setCounter(res.data.counter);
      console.log("RESPONSE", res, apiUrl);
    }
    ).catch((e) => console.log("ERROR", e));
  }, [])

 return (
    <FanCounter counter={counter}/>
 );
};

export default FanCounterPage;