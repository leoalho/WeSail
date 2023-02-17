/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Card from './Card'
import SideNav from '../Sidenav'
import { getLogs } from '../../services/logs'
import { useEffect, useState } from 'react'
import { Log } from '../../types'

const Home = () => {
  const [logs, setLogs] = useState<Log[]>([])
  useEffect(() => {
    getLogs().then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
  }, [])  

  return (
      <div className="main">
        <SideNav />
        <div className="right">
          <div className='content'>Show (all, your activity, your friends activity)</div>
          {logs.map(log => <Card key={log.id} boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
        </div>
      </div>
    )
  }

export default Home