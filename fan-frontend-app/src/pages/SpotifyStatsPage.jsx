import { useEffect, useState } from "react"
import { apiUrl } from "../constants/environment";
import axiosInstance from "../interceptors/keycloak-interceptor";
import { TopTrackTime } from "../components/TopTrackTime";

export function SpotifyStatsPage(){
  const [topTracks, setTopTracks] = useState([{}]);

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/tf-stats`).then(res => {
      console.log(res)
      setTopTracks(res.data);
    })
  }, [])

  return (
    <div>
      <h1>Top Taylor swift tracks as of today:</h1>
      <ol>
      {topTracks.map((track, id) => {
        return <li key={id}>
          { track.urls !== undefined ?
          <a href={`${track.urls}`}>{track.name}</a> 
          :
          <span>{track.name}</span>
          }
        </li>
      })}
      </ol>
      <TopTrackTime name={topTracks[0].name}/>
    </div>
  )
}