/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from "react"
import Select from 'react-select'

import { getUsers } from "../../services/users"
import { deleteBoat } from "../../services/boats"
import { Boat, Friend, User, Option } from "../../types"

interface Props {
    applications: Friend[],
    acceptCrewRequest: Function,
    rejectCrewRequest: Function,
    boat: Boat
}

const Owner = ({applications, acceptCrewRequest, rejectCrewRequest, boat}: Props) => {
  const [edit, setEdit] = useState(false)
  const [users, setUSers] = useState<Option[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Option[]>([])

  useEffect(() => {
    const newUsers: Option[] = []
    getUsers().then((users: User[]) => {
      users.forEach(user => newUsers.push({value: user.id, label: user.username}))
    }).catch(e => console.log(e.response.data.error))
    setUSers(newUsers)
  }, [])

  const deleteButton = async () => {
    if (confirm("Are you shure you want to delete?")){
      await deleteBoat(boat.id)
    }
  }

  const addOwner = () => {
    console.log(selectedUsers)
  }

  return (
  <>
    <center><h3>Owner page</h3></center>
    {edit ? <>
      <Select isMulti name="todos" options={users} onChange={(option) => setSelectedUsers([...option])} className="basic-multi-select" classNamePrefix="select" /><button className="button" onClick={addOwner}>Add owner</button><br />
        <button className="button" style={{margin: "5px"}} onClick={deleteButton}>Delete boat</button><br />
        <button className="button" style={{margin: "5px"}}>Save</button><button className="button" onClick={()=>setEdit(!edit)}>Cancel</button>
      </>
      : <>
        {applications.length>0 && <div>Crew applications:</div>}
        {applications.map(application => <>{application.username} <button onClick={async () => await acceptCrewRequest(application.id)}>Accept</button>
        <button onClick={async () => await rejectCrewRequest(application.id)}>Reject</button><br/></>)}
        Owners: {boat.owners.map(owner => <>{owner.username}, </>)}<br/>
        Crewmembers: {boat.crew.map(crewmember => <>{crewmember.username}, </>)}<br/>
        <button className="button" onClick={()=>setEdit(!edit)}>Edit</button>
      </>
    }
  </>
  )
}

export default Owner