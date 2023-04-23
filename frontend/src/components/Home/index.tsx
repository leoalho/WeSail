/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Card from "./Card";
import SideNav from "../Sidenav";
import { getLogs } from "../../services/logs";
import { useEffect, useState } from "react";
import { Log, RootState } from "../../types";
import { useSelector } from "react-redux";

const Home = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [friendActivity, setFriendActivity] = useState(true);
  const [yourboats, setYourboats] = useState(true);
  const [followingboats, setFollowingboats] = useState(true);
  const [crewboats, setCrewboats] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user);
  const [mobileSelected, setMobileSelected] = useState("logs");
  const [width, setWidth] = useState(window.innerWidth);

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
        setFilteredLogs(newLogs);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    filterLogs();
  }, [friendActivity, yourboats, followingboats, crewboats]);

  const filterLogs = () => {
    const newLogs: Log[] = [];
    logs.forEach((log) => {
      let newLog = false;
      if (yourboats) {
        currentUser.boats.forEach((boat) => {
          if (boat.id === log.boat.id) {
            newLog = true;
          }
        });
      }
      if (followingboats && !newLog) {
        currentUser.boatsFollowing.forEach((boat) => {
          if (boat.id === log.boat.id) {
            newLog = true;
          }
        });
      }
      if (crewboats && !newLog) {
        currentUser.crewMember.forEach((boat) => {
          if (boat.id === log.boat.id) {
            newLog = true;
          }
        });
      }
      if (friendActivity && !newLog) {
        currentUser.friends.forEach((friend) => {
          if (friend.id === log.creator.id) {
            newLog = true;
          }
        });
      }
      if (newLog) {
        newLogs.push(log);
      }
    });
    setFilteredLogs(newLogs);
  };

  const toggleStyle = {
    padding: "5px",
    margin: "5px",
    borderWidth: "1px",
    transitionDuration: "0.4s",
    cursor: "pointer",
    borderColor: "#002f6c",
    borderRadius: "5px",
  };

  const selectStyle = {
    padding: "5px",
    borderWidth: "0px",
    transitionDuration: "0.4s",
    cursor: "pointer",
    borderColor: "#002f6c",
    width: "50%",
  };

  const selected = {
    color: "white",
    backgroundColor: "#002f6c",
  };

  const topSelected = {
    color: "#002f6c",
    backgroundColor: "#eeeeee",
  };

  const unSelected = {
    color: "#002f6c",
    backgroundColor: "white",
  };

  if (width < 1000) {
    return (
      <>
        <div className="mobileSelector">
          <button
            style={
              mobileSelected === "logs"
                ? { ...topSelected, ...selectStyle }
                : { ...unSelected, ...selectStyle }
            }
            onClick={() => {
              setMobileSelected("logs");
            }}
          >
            Logs
          </button>
          <button
            style={
              mobileSelected === "events"
                ? { ...topSelected, ...selectStyle }
                : { ...unSelected, ...selectStyle }
            }
            onClick={() => {
              setMobileSelected("events");
            }}
          >
            events
          </button>
        </div>
        <div className="logButtons">
          Show:
          {
            <button
              style={
                friendActivity
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setFriendActivity(!friendActivity)}
            >
              Friends
            </button>
          }
          {
            <button
              style={
                yourboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setYourboats(!yourboats)}
            >
              Your boats
            </button>
          }
          {
            <button
              style={
                followingboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setFollowingboats(!followingboats)}
            >
              Boats you follow
            </button>
          }
          {
            <button
              style={
                crewboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setCrewboats(!crewboats)}
            >
              Boats you are a crew member of
            </button>
          }
        </div>
        <div className="main">
          {mobileSelected === "events" && (
            <SideNav
              yourboats={yourboats}
              followingboats={followingboats}
              crewboats={crewboats}
              friendActivity={friendActivity}
            />
          )}
          {mobileSelected === "logs" && (
            <div className="right">
              {filteredLogs.length === 0 && (
                <center style={{ paddingTop: "10px" }}>
                  No log entries yet.
                </center>
              )}
              {filteredLogs.map((log) => (
                <Card
                  key={log.id}
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
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#eeeeee" }}>
        <div className="logButtons">
          Show:
          {
            <button
              style={
                friendActivity
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setFriendActivity(!friendActivity)}
            >
              Friends
            </button>
          }
          {
            <button
              style={
                yourboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setYourboats(!yourboats)}
            >
              Your boats
            </button>
          }
          {
            <button
              style={
                followingboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setFollowingboats(!followingboats)}
            >
              Boats you follow
            </button>
          }
          {
            <button
              style={
                crewboats
                  ? { ...selected, ...toggleStyle }
                  : { ...unSelected, ...toggleStyle }
              }
              onClick={() => setCrewboats(!crewboats)}
            >
              Boats you are a crew member of
            </button>
          }
        </div>
      </div>
      <div className="main">
        <SideNav
          yourboats={yourboats}
          followingboats={followingboats}
          crewboats={crewboats}
          friendActivity={friendActivity}
        />
        <div className="right">
          {filteredLogs.length === 0 && (
            <center style={{ paddingTop: "10px", width: "700px" }}>
              No log entries yet.
            </center>
          )}
          {filteredLogs.map((log) => (
            <Card
              key={log.id}
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
    </>
  );
};

export default Home;
