/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { getEvents } from "../../services/events"
import { Event } from "../../types"
import Card from "./Card"

const SideNav = () => {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    getEvents().then(newEvents => setEvents(newEvents)).catch(e => console.log(e))
  }, [])

  return (
    <div id="sideNav">
    <div>Upcoming events:</div>
    {events.map((card) => <Card boat={card.boat} date={card.date} time={card.time} location={card.location} description={card.description}/>)}
    </div>
)}

export default SideNav