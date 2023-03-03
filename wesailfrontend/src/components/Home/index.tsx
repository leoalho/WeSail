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
  const [friendActivity, setFriendActivity] = useState(true)
  const [yourboats, setYourboats] = useState(true)
  const [followingboats, setFollowingboats] = useState(true)
  const [crewboats, setCrewboats] = useState(true)
  const currentUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getLogs().then((newLogs) => {
        setLogs(newLogs)
        setFilteredLogs(newLogs)
    }).catch(e => console.log(e))
  }, [])  

  useEffect(() => {
    filterLogs()
  }, [friendActivity, yourboats, followingboats, crewboats])  

  const filterLogs = () => {
    const newLogs: Log[] = []
    logs.forEach((log) => {
        let newLog = false
        if (yourboats){
            currentUser.boats.forEach((boat) => {
                if (boat.id===log.boat.id){
                    newLog = true
                }
            })
        }
        if (followingboats && !newLog){
            currentUser.boatsFollowing.forEach((boat) => {
                if (boat.id===log.boat.id){
                    newLog = true
                }
            })
        }
        if (crewboats && !newLog){
            currentUser.crewMember.forEach((boat) => {
                if (boat.id===log.boat.id){
                    newLog = true
                }
            })
        }
        if (friendActivity && !newLog){
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
        <SideNav yourboats={yourboats} followingboats={followingboats} crewboats={crewboats} friendActivity={friendActivity} />
        <div className="right">
          <div className='content'>Show 
          {/*<span style={friendActivity?{backgroundColor: "#002f6c", color: "white"}:{}} onClick={() => setFriendActivity(!friendActivity)}>Friends</span>*/}
          <input type="checkbox" id="friendactivity" name="friendactivity" checked={friendActivity} onChange={() => setFriendActivity(!friendActivity)}/>your friends activity
          <input type="checkbox" id="yourboats" name="yourboats" checked={yourboats} onChange={() => setYourboats(!yourboats)}/>your boats
          <input type="checkbox" id="followingboats" name="followingboats" checked={followingboats} onChange={() => setFollowingboats(!followingboats)}/>boats you follow
          <input type="checkbox" id="crewboats" name="crewboats" checked={crewboats} onChange={() => setCrewboats(!crewboats)}/>boats you are a crewmember of
        </div>
          {filteredLogs.length===0 && <center style={{paddingTop: "10px"}}>No log entries yet.</center>}
          {filteredLogs.map(log => <Card key={log.id} boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
        </div>
      </div>
    )
  }

export default Home