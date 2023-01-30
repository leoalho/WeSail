
interface Props {
  boat: string,
  date: string,
  time: string,
  location: string,
  description: string
}

const Card = (props: Props) => {
  const date = new Date(props.date)
  return (
    <div className="eventCard">
      <b>{date.toString()} at {props.time}</b><br/>
      <b>{props.boat} </b>
      <div>{props.location}</div>
      <div>{props.description}</div>
    </div>
  )

}

export default Card