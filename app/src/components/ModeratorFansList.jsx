import { apiUrl } from "../constans/environment";
import axiosInstance from "../interceptors/keycloak-interceptor";

export default function ModeratorFansList({fans, setFans}) {

  const handleDeleteFan = (fanId) => {
    const updatedFans = fans.filter((fan) => fan._id != fanId);
    setFans(updatedFans);
    axiosInstance.delete(`${apiUrl}/fan/${fanId}`).then(console.log).catch(console.log);
  }

  return <ul>{fans.map((fan, id) => (
      <li key={id} className="pb-2">
        <span className="pr-2">{fan.name},</span>
        <span className="pr-2">{fan.age}</span>
        <button className="button-small" onClick={() => handleDeleteFan(fan._id)}>x</button>
    </li>
  )
  )}</ul>
}

