import { AdminFan } from "./AdminFan";

export default function AdminFansList({fans, setFans}) {

  return <ul>{fans.map((fan, id) => (
      <li key={id} className='pb-2'>
        <AdminFan fan={fan} fans={fans} setFans={setFans}/>
      </li>
  )
  )}</ul>
}