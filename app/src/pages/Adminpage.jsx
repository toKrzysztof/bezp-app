import { useEffect, useState } from "react";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { apiUrl } from "../constans/environment";
import FanForm from "../components/FanForm";
import AdminFansList from "../components/AdminFansList";

const AdminPage = () => {
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
    <AdminFansList fans={fans} setFans={setFans}/>
    <FanForm fans={fans} setFans={setFans} />
  </div>
 );
};

export default AdminPage;