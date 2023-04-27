/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSelector } from "react-redux";
import { Application, RootState, User } from "../../types";

interface Props {
  user: User;
  friend: Application;
  sendRequest: () => Promise<void>;
  unfriend: () => Promise<void>;
}

const UserInfo = ({ user, friend, sendRequest, unfriend }: Props) => {
  const currentUser = useSelector((state: RootState) => state.user);

  return (
    <div className="singleUserInfo">
      <center>
        <img
          src="/images/user_profile_images/default.jpg"
          alt="Avatar"
          className="user_avatar"
        ></img>
      </center>
      <div style={{ padding: "5px" }}>
        <div>
          <center>
            <b>
              <u>{user.username}</u>
            </b>
            <br />
          </center>
        </div>
        {currentUser.id !== user.id && friend === Application.No && (
          <button style={{ marginTop: "5px" }} onClick={sendRequest}>
            Send friend request
          </button>
        )}
        {friend === Application.Pending && <>Friend application sent</>}
        {friend === Application.Accepted && (
          <button style={{ marginTop: "5px" }} onClick={unfriend}>
            UnFriend
          </button>
        )}
        <br />
      </div>
    </div>
  );
};

export default UserInfo;
