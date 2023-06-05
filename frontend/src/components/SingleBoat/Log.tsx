import { useEffect, useState } from "react";
import LogCard from "../Home/Card";
import { Log } from "../../types";
import { getBoatLogs } from "../../services/logs";
import { useParams, useNavigate } from "react-router-dom";

interface Props {
  isOwner: boolean;
}

const BoatLog = ({ isOwner }: Props) => {
  const [sails, setSails] = useState(true);
  const [maintenances, setMaintenances] = useState(true);
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBoatLogs(id)
        .then((newLogs) => {
          setLogs(newLogs);
          setFilteredLogs(newLogs);
        })
        .catch((e) => console.log(e));
    }
  }, [id]);

  const filterLogs = () => {
    const newLogs: Log[] = [];
    logs.forEach((log) => {
      let newLog = false;
      if (sails && log.logType === "sail") {
        newLog = true;
      }
      if (maintenances && log.logType === "maintenance") {
        newLog = true;
      }
      if (newLog) {
        newLogs.push(log);
      }
    });
    setFilteredLogs(newLogs);
  };

  useEffect(() => {
    filterLogs();
  }, [sails, maintenances]);

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

  return (
    <>
      <div className="singleBoatToggle">
        <b>Boat log:</b>
        {isOwner && (
          <span style={{ float: "right" }}>
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
      {logs.length === 0 && <div className="singleBoatLogs">No logs yet</div>}
      <div className="singleBoatLogs">
        {filteredLogs.map((log) => (
          <LogCard
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
    </>
  );
};

export default BoatLog;
