import { Boat } from "../../types";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  boat: Boat;
}

const Crew = ({ boat }: Props) => {
  return (
    <>
      <center>
        <h2>Crew page</h2>
      </center>
      Owners:{" "}
      {boat.owners.map((owner, index) => (
        <React.Fragment key={owner.id}>
          <Link to={`/users/${owner.id}`}>{owner.username}</Link>
          {index === boat.owners.length - 1 ? "" : ", "}
        </React.Fragment>
      ))}
      <br />
      Crewmembers:{" "}
      {boat.crew.map((crewmember, index) => (
        <React.Fragment key={crewmember.id}>
          <Link to={`/users/${crewmember.id}`}>{crewmember.username}</Link>
          {index === boat.crew.length - 1 ? "" : ", "}
        </React.Fragment>
      ))}
    </>
  );
};

export default Crew;
