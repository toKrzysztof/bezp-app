export default function FansList({fans}) {
  return <ul>{fans.map((fan, id) => (
      <li key={id}>
      <span className="pr-2">{fan.name}</span>
      <span>{fan.age}</span>
    </li>
  )
  )}</ul>
}