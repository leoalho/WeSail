import { useNavigate } from "react-router-dom";

const selected = {
  color: "white",
  backgroundColor: "#002f6c",
};

const unSelected = {
  color: "#002f6c",
  backgroundColor: "white",
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

interface Props {
  isOwner: boolean;
  sails: boolean;
  maintenances: boolean;
  setSails: React.Dispatch<React.SetStateAction<boolean>>;
  setMaintenances: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogHeader = ({
  isOwner,
  sails,
  maintenances,
  setSails,
  setMaintenances,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="singleBoatToggle">
      <b>Boat log:</b>
      {isOwner && (
        <span style={{ float: "right", marginRight: "10px" }}>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/newLog")}
          >
            New log entry
          </button>
          <button onClick={() => navigate("/newEvent")}>New event</button>
        </span>
      )}
      <br />
      Show:
      <button
        style={
          sails
            ? { ...selected, ...toggleStyle }
            : { ...unSelected, ...toggleStyle }
        }
        onClick={() => setSails(!sails)}
      >
        sails
      </button>
      <button
        style={
          maintenances
            ? { ...selected, ...toggleStyle }
            : { ...unSelected, ...toggleStyle }
        }
        onClick={() => setMaintenances(!maintenances)}
      >
        maintenances
      </button>
    </div>
  );
};

export default LogHeader;
