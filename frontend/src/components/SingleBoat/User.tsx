/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Application } from "../../types";

interface Props {
  isFollowing: boolean;
  followBoat: any;
  unFollowBoat: any;
  sendCrewRequest: any;
  crewApplication: Application;
}

const User = ({
  isFollowing,
  unFollowBoat,
  followBoat,
  crewApplication,
  sendCrewRequest,
}: Props) => {
  return (
    <center>
      {isFollowing ? (
        <button onClick={unFollowBoat} style={{ marginBottom: "5px" }}>
          Unfollow
        </button>
      ) : (
        <button style={{ marginBottom: "5px" }} onClick={followBoat}>
          Start following
        </button>
      )}
      <br />
      {crewApplication === Application.No && (
        <button onClick={sendCrewRequest}>Apply for crew</button>
      )}
      {crewApplication === Application.Pending && (
        <>Application waiting for approval</>
      )}
      <br />
    </center>
  );
};

export default User;
