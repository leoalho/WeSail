/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Friend } from "../../types"

interface Props {
    applications: Friend[],
    acceptCrewRequest: Function,
    rejectCrewRequest: Function
}

const Owner = ({applications, acceptCrewRequest, rejectCrewRequest}: Props) => {
  return (
    <>
      <h3>Owner page</h3>
      {applications.length>0 && <div>Crew applications:</div>}
      {applications.map(application => <>{application.username} <button onClick={async () => await acceptCrewRequest(application.id)}>Accept</button>
      <button onClick={async () => await rejectCrewRequest(application.id)}>Reject</button><br/></>)}
    </>
  
  )
}

export default Owner