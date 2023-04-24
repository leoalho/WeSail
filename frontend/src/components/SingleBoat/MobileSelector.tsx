interface Props {
  mobileSelected: string;
  setMobileSelected: React.Dispatch<React.SetStateAction<string>>;
}

const MobileSelector = ({ mobileSelected, setMobileSelected }: Props) => {
  const unSelected = {
    color: "#002f6c",
    backgroundColor: "white",
  };

  const topSelected = {
    color: "#002f6c",
    backgroundColor: "#eeeeee",
  };

  const selectStyle = {
    padding: "5px",
    borderWidth: "0px",
    transitionDuration: "0.4s",
    cursor: "pointer",
    borderColor: "#002f6c",
    width: "25%",
  };

  return (
    <div className="mobileSelector">
      <button
        style={
          mobileSelected === "info"
            ? { ...topSelected, ...selectStyle }
            : { ...unSelected, ...selectStyle }
        }
        onClick={() => {
          setMobileSelected("info");
        }}
      >
        Info
      </button>
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
      <button
        style={
          mobileSelected === "todos"
            ? { ...topSelected, ...selectStyle }
            : { ...unSelected, ...selectStyle }
        }
        onClick={() => {
          setMobileSelected("todos");
        }}
      >
        Todos
      </button>
    </div>
  );
};

export default MobileSelector;
