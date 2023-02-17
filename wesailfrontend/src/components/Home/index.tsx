/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Card from './Card'
import SideNav from '../Sidenav'
import { getLogs } from '../../services/logs'
import { useEffect, useState } from 'react'
import { Log, RootState } from '../../types'
import { useSelector } from 'react-redux'

const Home = () => {
  const [logs, setLogs] = useState<Log[]>([])
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([])
  const [yourActivity, setYourActivity] = useState(true)
  const [friendActivity, setFriendActivity] = useState(true)
  const currentUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getLogs().then((newLogs) => {
        setLogs(newLogs)
        setFilteredLogs(newLogs)
    }).catch(e => console.log(e))
  }, [])  

  useEffect(() => {
    filterLogs()
  }, [yourActivity, friendActivity])  

  const filterLogs = () => {
    const newLogs: Log[] = []
    logs.forEach((log) => {
        let newLog = false
        if (yourActivity){
            if (currentUser.id===log.creator.id){
                newLog = true
            }
        }
        if (friendActivity){
            currentUser.friends.forEach((friend) => {
                if (friend.id===log.creator.id){
                    newLog = true
                }
            })
        }
        if (newLog){
            newLogs.push(log)
        }
    })
    setFilteredLogs(newLogs)
  }

  return (
      <div className="main">
        <SideNav />
        <div className="right">
          <div className='content'>Show 
          <input type="checkbox" id="youractivity" name="youractivity" checked={yourActivity} onChange={() => setYourActivity(!yourActivity)}/>your activity,
          <input type="checkbox" id="friendactivity" name="friendactivity" checked={friendActivity} onChange={() => setFriendActivity(!friendActivity)}/>your friends activity
        </div>
          {filteredLogs.map(log => <Card key={log.id} boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
        </div>
      </div>
    )
  }

export default Home