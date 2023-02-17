/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Fix anys

interface Props {
    isFollowing: boolean,
    followBoat: any,
    unFollowBoat: any
}

const User = ({isFollowing, unFollowBoat, followBoat}: Props) => {
    return (<>
        {isFollowing ? <button onClick={unFollowBoat}>Unfollow</button> : <button onClick={followBoat}>Start following</button>}<br/>
        <button>Apply for crew</button><br/></>)
  }
  
  export default User