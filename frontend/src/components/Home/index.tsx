/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Card from "./Card";
import SideNav from "@/components/Sidenav";
import { getLogs } from "@/services/logs";
import { useEffect, useState } from "react";
import { Log, RootState, Option, BoatUser, User, Friend } from "@/types";
import { useSelector } from "react-redux";
import MobileSelector from "@/components/SingleBoat/MobileSelector";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  boats: BoatUser[];
}

interface UserLinkProps {
  user: User | Friend;
}

const UserLink = ({ user }: UserLinkProps) => {
  return (
    <>
      <img
        style={{ verticalAlign: "middle" }}
        src="/images/user_profile_images/default.jpg"
        className="boat_card"
      />
      <Link to={`/users/${user.id}`}>{user.username}</Link>
      <br />
    </>
  );
};

const BoatLinks = ({ boats }: Props) => {
  return (
    <>
      {boats.map((boat) => (
        <React.Fragment key={boat.id}>
          <img
            style={{ verticalAlign: "middle" }}
            src={`/images/boat_profile_images/${
              boat.profilePicture
                ? `${boat.id}.jpeg?${Math.random().toString(36)}`
                : "default.jpg"
            }`}
            alt="Avatar"
            className="boat_card"
          />
          <Link to={`/boats/${boat.id}`}>{boat.name}</Link>
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

const Home = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [mobileSelected, setMobileSelected] = useState("logs");
  const [width, setWidth] = useState(window.innerWidth);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getLogs()
      .then((newLogs) => {
        setLogs(newLogs);
      })
      .catch((e) => console.log(e));
  }, []);

  const mobileOptions: Option[] = [
    { value: "logs", label: "Logs" },
    { value: "events", label: "Events" },
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

        <div className="main">
          {mobileSelected === "events" && <SideNav />}
          {mobileSelected === "logs" && (
            <div className="right">
              {logs.length === 0 && (
                <center style={{ paddingTop: "10px" }}>
                  No log entries yet.
                </center>
              )}
              {logs.map((log) => (
                <Card
                  key={log.id}
                  boat={log.boat}
                  startTime={log.startTime}
                  endTime={log.endTime}
                  start={log.start}
                  end={log.end}
                  participants={log.participants}
                  description={log.description}
                  image={log.route.length > 0}
                  image_id={log.id}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="main">
        <div
          style={{
            width: "300px",
            marginRight: "10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              boxSizing: "border-box",
            }}
          >
            {user.boats.length > 0 && (
              <>
                <b>
                  <u>Your Boats:</u>
                </b>
                <br />
                <BoatLinks boats={user.boats} />
              </>
            )}
            {user.crewMember.length > 0 && (
              <>
                <b>
                  <u>Boats you are a crewmember:</u>
                </b>
                <br />
                <BoatLinks boats={user.crewMember} />
              </>
            )}
            {user.boatsFollowing.length > 0 && (
              <>
                <>
                  <b>
                    <u>Boats you follow:</u>
                  </b>
                  <br />
                  <BoatLinks boats={user.boatsFollowing} />
                </>
              </>
            )}
            {user.friends.length > 0 && (
              <>
                <b>
                  <u>Your friends:</u>
                </b>
                <br />
                {user.friends.map((friend) => (
                  <UserLink user={friend} />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="right">
          {logs.length === 0 && (
            <center style={{ paddingTop: "10px", width: "700px" }}>
              No log entries yet.
            </center>
          )}
          {logs.map((log) => (
            <Card
              key={log.id}
              boat={log.boat}
              startTime={log.startTime}
              endTime={log.endTime}
              start={log.start}
              end={log.end}
              participants={log.participants}
              description={log.description}
              image={log.route.length > 0}
              image_id={log.id}
            />
          ))}
        </div>
        <SideNav />
      </div>
    </>
  );
};

export default Home;
