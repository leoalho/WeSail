import { Application, Boat, RootState } from "../../../types";
import Crew from "./Crew";
import Owner from "./Owner";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../services/users";
import {
  updateFollowing,
  updatePendingCrew,
} from "../../../reducers/userReducer";
import { updateBoat } from "../../../services/boats";

interface Props {
  boat: Boat;
  setBoat: React.Dispatch<React.SetStateAction<Boat | null>>;
  isOwner: boolean;
  isFollowing: boolean;
  isCrew: boolean;
  crewApplication: Application;
}

const Info = ({
  boat,
  setBoat,
  isOwner,
  isFollowing,
  crewApplication,
  isCrew,
}: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const followBoat = async () => {
    const newuser = await updateUser(user.id, {
      op: "add",
      path: "/boatsFollowing",
      value: boat.id,
    });
    dispatch(updateFollowing(newuser.boatsFollowing));
  };

  const unFollowBoat = async () => {
    const newuser = await updateUser(user.id, {
      op: "remove",
      path: "/boatsFollowing",
      value: boat.id,
    });
    dispatch(updateFollowing(newuser.boatsFollowing));
  };

  const sendCrewRequest = async () => {
    const newUser = await updateUser(user.id, {
      op: "add",
      path: "/crewRequestsPending",
      value: boat.id,
    });
    dispatch(updatePendingCrew(newUser.crewRequestsPending));
  };

  const acceptCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, [
      { op: "add", path: "/crew", value: userId },
    ]);
    setBoat(newBoat);
  };

  const rejectCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, [
      { op: "remove", path: "/crewRequests", value: userId },
    ]);
    setBoat(newBoat);
  };

  return (
    <div className="boat_info">
      <div className="boat_info_card">
        <center>
          <img
            src="/images/boat_profile_images/default.jpg"
            alt="Avatar"
            className="boat_avatar"
          ></img>
        </center>
        <div style={{ padding: "5px" }}>
          <center>
            <h2>{boat.name}</h2>
          </center>
          {isOwner && (
            <Owner
              boat={boat}
              setBoat={setBoat}
              applications={boat.crewRequests}
              acceptCrewRequest={acceptCrewRequest}
              rejectCrewRequest={rejectCrewRequest}
            />
          )}
          {isCrew && <Crew boat={boat} />}
          {!isOwner && !isCrew && (
            <User
              isFollowing={isFollowing}
              followBoat={followBoat}
              unFollowBoat={unFollowBoat}
              sendCrewRequest={sendCrewRequest}
              crewApplication={crewApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
