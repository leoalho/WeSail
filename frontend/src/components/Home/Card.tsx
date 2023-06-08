import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoatUser, Friend } from "../../types";

interface Props {
  image_id: string;
  boat: BoatUser;
  startTime: string;
  endTime: string;
  start: string;
  end: string;
  participants: Friend[];
  description: string;
  image: boolean;
}

interface Props2 {
  participants: Friend[];
}

export const Participants = ({ participants }: Props2) => {
  if (participants.length == 0) {
    return <></>;
  } else if (participants.length < 4) {
    return (
      <>
        with{" "}
        {participants.map((participant, index) => (
          <React.Fragment key={participant.id}>
            <Link to={`/users/${participant.id}`}>{participant.username}</Link>
            {index === participants.length - 1 ? "" : ", "}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    return (
      <>
        with{" "}
        <Link to={`/users/${participants[0].id}`}>
          {participants[0].username}
        </Link>
        ,{" "}
        <Link to={`/users/${participants[1].id}`}>
          {participants[1].username}
        </Link>
        ,{" "}
        <Link to={`/users/${participants[2].id}`}>
          {participants[2].username}
        </Link>
        ...
      </>
    );
  }
};

const Card = (props: Props) => {
  const navigate = useNavigate();
  const date = new Date(props.endTime);
  return (
    <div
      className="content"
      onClick={() => {
        navigate(`/logs/${props.image_id}`);
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <img
            src={`/images/boat_profile_images/${
              props.boat.profilePicture
                ? `${props.boat.id}.jpeg?${Math.random().toString(36)}`
                : "default.jpg"
            }`}
            alt="Avatar"
            className="boat_card"
          ></img>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <b>
            <Link to={`/boats/${props.boat.id}`}>{props.boat.name}</Link>
          </b>{" "}
          with <Participants participants={props.participants} />
          <br />
          {date.toLocaleDateString()}{" "}
          {(date.getHours() < 10 ? "0" : "") + date.getHours()}:
          {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
          <br />
        </div>
      </div>
      {props.start && props.end ? (
        <>
          From {props.start} to {props.end}
          <br />
        </>
      ) : (
        <>@{props.start} </>
      )}
      {props.description}
      <br />
      {props.image && (
        <center>
          <img
            src={`/images/log_maps/${props.image_id}.png`}
            alt="log_map"
            className="log_map"
            style={{
              maxWidth: "100%",
              width: "700px",
            }}
          ></img>
        </center>
      )}
    </div>
  );
};

export default Card;
