import { useEffect, useState } from "react";
import LogCard from "../Home/Card";
import { Log } from "../../types";
import { getBoatLogs } from "../../services/logs";
import { useParams } from "react-router-dom";

interface Props {
  sails: boolean;
  maintenances: boolean;
}

const BoatLog = ({ sails, maintenances }: Props) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);

  const { id } = useParams();

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

  return (
    <div>
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
            image={log.route.length > 0}
            image_id={log.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BoatLog;
