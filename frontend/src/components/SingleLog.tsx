import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Log } from "../types";
import { getSingleLog } from "../services/logs";

const SingleLog = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [log, setLog] = useState<Log | null>(null);
  const { id } = useParams();
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      console.log(width);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      getSingleLog(id)
        .then((log) => setLog(log))
        .catch((e) => console.log(e));
    }
  }, [id]);

  if (!id) {
    return <>Wrong path</>;
  }

  if (!log) {
    return <>Loading...</>;
  }

  return (
    <>
      {log.boat.name}
      <br />
      {log.description}
    </>
  );
};

export default SingleLog;
