/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
import { updateUser, getUser } from "../../services/users";
import { User, RootState, Log, Application, Option } from "../../types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogs } from "../../services/logs";
import Card from "../Home/Card";
import {
  updateFriends,
  updatePendingFriends,
} from "../../reducers/userReducer";
import MobileSelector from "../SingleBoat/MobileSelector";
import UserInfo from "./UserInfo";
//import Card from "./Home/Card"

const SingleUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<User | null>(null);
  const [friend, setFriend] = useState<Application>(Application.No);
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [mobileSelected, setMobileSelected] = useState("logs");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((user) => setUser(user))
        .catch((e) => console.log(e));
      getUserLogs(id)
        .then((newLogs) => setLogs(newLogs))
        .catch((e) => console.log(e));
    }
  }, [id]);

  useEffect(() => {
    setFriend(Application.No);
    currentUser.friends.forEach((friend) => {
      if (friend.id === id) {
        setFriend(Application.Accepted);
        return;
      }
    });
    currentUser.friendRequestsPending.forEach((request) => {
      if (request.id === id) {
        setFriend(Application.Pending);
        return;
      }
    });
  }, [id, currentUser]); //currentUSer could perhaps be removed here?

  if (!id) {
    return <>Wrong path</>;
  }

  if (!user) {
    return <>Loading...</>;
  }

  const unfriend = async () => {
    const newUser = await updateUser(currentUser.id, {
      op: "remove",
      path: "/friends",
      value: id,
    });
    dispatch(updateFriends(newUser.friends));
    setFriend(Application.No);
  };

  const sendRequest = async () => {
    const newUser = await updateUser(currentUser.id, {
      op: "add",
      path: "/friendRequestsPending",
      value: id,
    });
    dispatch(updatePendingFriends(newUser.friendRequestsPending));
    setFriend(Application.Pending);
  };

  const mobileOptions: Option[] = [
    { value: "info", label: "Info" },
    { value: "logs", label: "Logs" },
  ];

  if (width < 1000) {
    return (
      <>
        <MobileSelector
          mobileSelected={mobileSelected}
          setMobileSelected={setMobileSelected}
          labels={mobileOptions}
          singleWidth="50%"
        />
        {mobileSelected === "info" && (
          <UserInfo
            user={user}
            friend={friend}
            sendRequest={sendRequest}
            unfriend={unfriend}
          />
        )}
        {mobileSelected === "logs" && (
          <div className="main">
            <div
              style={{
                width: "100%",
                marginRight: "5px",
                overflowY: "scroll",
                boxSizing: "border-box",
              }}
            >
              <div>
                <b>User log:</b>
              </div>
              {logs.map((log) => (
                <Card
                  boat={log.boat}
                  startTime={log.startTime}
                  endTime={log.endTime}
                  start={log.start}
                  end={log.end}
                  participants={log.participants}
                  description={log.description}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="main">
      <div>
        <UserInfo
          user={user}
          friend={friend}
          sendRequest={sendRequest}
          unfriend={unfriend}
        />
      </div>
      <div>
        <div style={{ width: "705px" }}>
          <b>User log:</b>
        </div>
        {logs.map((log) => (
          <Card
            boat={log.boat}
            startTime={log.startTime}
            endTime={log.endTime}
            start={log.start}
            end={log.end}
            participants={log.participants}
            description={log.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleUser;
