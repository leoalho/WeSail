/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Boat, RootState, Application, Option } from "../../types";
import { getBoat } from "../../services/boats";

import Todos from "./Todos";
import BoatLog from "./Log";
import MobileSelector from "./MobileSelector";
import Info from "./Info";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";

const SingleBoat = () => {
  const [boat, setBoat] = useState<Boat | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isCrew, setIsCrew] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [crewApplication, setCrewApplication] = useState<Application>(
    Application.No
  );
  const [mobileSelected, setMobileSelected] = useState("logs");
  const [width, setWidth] = useState(window.innerWidth);

  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      getBoat(id)
        .then((boat) => {
          setBoat(boat);
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  useEffect(() => {
    setIsOwner(false);
    setIsFollowing(false);
    setIsCrew(false);
    user.boatsFollowing.forEach((follower) => {
      if (follower.id === id) {
        setIsFollowing(true);
        return;
      }
    });
    user.boats.forEach((boat) => {
      if (boat.id === id) {
        setIsOwner(true);
        return;
      }
    });
    user.crewMember.forEach((boat) => {
      if (boat.id === id) {
        setIsCrew(true);
        return;
      }
    });
    setCrewApplication(Application.No);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    user.crewRequestsPending.forEach((request) => {
      if (request.id === id) {
        setCrewApplication(Application.Pending);
        return;
      }
    });
  }, [id, user]);

  if (!boat) {
    return <>Loading ...</>;
  }

  const mobileOptions: Option[] = [
    { value: "info", label: "Info" },
    { value: "logs", label: "Logs" },
    { value: "events", label: "Events" },
    { value: "todos", label: "Todos" },
  ];

  if (width < 1200) {
    return (
      <>
        <MobileSelector
          mobileSelected={mobileSelected}
          setMobileSelected={setMobileSelected}
          labels={mobileOptions}
          singleWidth="25%"
        />
        <div className="main">
          {mobileSelected === "info" && (
            <Info
              boat={boat}
              setBoat={setBoat}
              isOwner={isOwner}
              isFollowing={isFollowing}
              isCrew={isCrew}
              crewApplication={crewApplication}
            />
          )}
          {mobileSelected === "logs" && (
            <div
              style={{
                width: "100%",
                marginRight: "5px",
                overflowY: "scroll",
                boxSizing: "border-box",
              }}
            >
              <BoatLog isOwner={isOwner} />
            </div>
          )}
          {mobileSelected === "events" && (
            <div style={{ width: "100%", overflowY: "scroll" }}>
              <UpcomingEvents />
              <PastEvents boatId={boat.id} />
            </div>
          )}
          {mobileSelected === "todos" && (
            <div style={{ width: "100%", overflowY: "scroll" }}>
              <Todos boat={boat} setBoat={setBoat} />
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="main">
      <Info
        boat={boat}
        setBoat={setBoat}
        isOwner={isOwner}
        isFollowing={isFollowing}
        isCrew={isCrew}
        crewApplication={crewApplication}
      />
      <div style={{ overflowY: "scroll" }}>
        <BoatLog isOwner={isOwner} />
      </div>
      <div style={{ marginLeft: "10px", overflowY: "scroll" }}>
        <UpcomingEvents />

        {(isOwner || isCrew) && <Todos boat={boat} setBoat={setBoat} />}

        <PastEvents boatId={boat.id} />
      </div>
    </div>
  );
};

export default SingleBoat;
