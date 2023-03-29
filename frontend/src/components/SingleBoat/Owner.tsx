/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Boat, Friend } from "../../types"

interface Props {
    applications: Friend[],
    acceptCrewRequest: Function,
    rejectCrewRequest: Function,
    boat: Boat
}

const Owner = ({applications, acceptCrewRequest, rejectCrewRequest, boat}: Props) => {
  return (
    <>
      <center><h3>Owner page</h3></center>
      {applications.length>0 && <div>Crew applications:</div>}
      {applications.map(application => <>{application.username} <button onClick={async () => await acceptCrewRequest(application.id)}>Accept</button>
      <button onClick={async () => await rejectCrewRequest(application.id)}>Reject</button><br/></>)}
      Owners: {boat.owners.map(owner => <>{owner.username}, </>)}<br/>
      Crewmembers: {boat.crew.map(crewmember => <>{crewmember.username}, </>)}<br/>
    </>
  
  )
}

export default Owner