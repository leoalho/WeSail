import { Option } from "../../types";

interface Props {
  mobileSelected: string;
  setMobileSelected: React.Dispatch<React.SetStateAction<string>>;
  labels: Option[];
  singleWidth: string;
}

const MobileSelector = ({
  mobileSelected,
  setMobileSelected,
  labels,
  singleWidth,
}: Props) => {
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
    width: singleWidth,
  };

  return (
    <div className="mobileSelector">
      {labels.map((label) => {
        return (
          <button
            style={
              mobileSelected === label.value
                ? { ...topSelected, ...selectStyle }
                : { ...unSelected, ...selectStyle }
            }
            onClick={() => {
              setMobileSelected(label.value);
            }}
          >
            {label.label}
          </button>
        );
      })}
    </div>
  );
};

export default MobileSelector;
