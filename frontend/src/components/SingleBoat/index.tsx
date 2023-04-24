/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Boat, RootState, Application } from "../../types";
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

  if (width < 1200) {
    return (
      <>
        <MobileSelector
          mobileSelected={mobileSelected}
          setMobileSelected={setMobileSelected}
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
            <div style={{ width: "100%", marginRight: "5px" }}>
              <BoatLog />
            </div>
          )}
          {mobileSelected === "events" && (
            <div style={{ width: "100%" }}>
              <UpcomingEvents />
              <PastEvents boatId={boat.id} />
            </div>
          )}
          {mobileSelected === "todos" && (
            <div style={{ width: "100%" }}>
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
      <div>
        <BoatLog />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <UpcomingEvents />

        {(isOwner || isCrew) && <Todos boat={boat} setBoat={setBoat} />}

        <PastEvents boatId={boat.id} />
      </div>
    </div>
  );
};

export default SingleBoat;
