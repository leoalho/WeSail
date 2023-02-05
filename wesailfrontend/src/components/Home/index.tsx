import Card from './Card'
import SideNav from '../Sidenav'
import { getLogs } from '../../services/logs'
import { useEffect, useState } from 'react'
import { Log } from '../../types'

/*
const testiData = [
  {
    boat: "Avance",
    date: "2023-02-01",
    start: "Finnoo",
    end: "Stora Herrø",
    participants: ["Leo"],
    description: "Nice weather and clear skies"
  },
  {
    boat: "Avance",
    date: "2023-02-01",
    start: "Finnoo",
    end: "Stora Herrø",
    participants: ["Leo", "Toto", "Aino", "Arno"],
    description: "Nice weather and clear skies"
  },
  {
    boat: "Avance",
    date: "2023-02-01",
    start: "Finnoo",
    end: "Stora Herrø",
    participants: ["Leo", "Toto", "Aino", "Arno"],
    description: "Nice weather and clear skies"
  },
  {
    boat: "Avance",
    date: "2023-02-01",
    start: "Finnoo",
    end: "Stora Herrø",
    participants: ["Leo", "Toto", "Aino", "Arno"],
    description: "Nice weather and clear skies"
  },
  {
    boat: "Avance",
    date: "2023-02-01",
    start: "Finnoo",
    end: "Stora Herrø",
    participants: ["Leo", "Toto", "Aino", "Arno"],
    description: "Nice weather and clear skies"
  }
]
*/

const Home = () => {
  const [logs, setLogs] = useState<Log[]>([])
  useEffect(() => {
    getLogs().then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
  }, [])  

  return (
      <div className="main">
        <SideNav />
        <div className="right">
          <div>Show (all, your activity, your friends activity)</div>
          {logs.map(log => <Card boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
        </div>
      </div>
    )
  }

export default Home