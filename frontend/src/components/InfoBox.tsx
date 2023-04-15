import { useEffect, useRef } from "react";

interface Props {
  onClickOutside: Function;
  message: string;
  show: boolean;
}

function InfoBox(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) return null;

  return (
    <div ref={ref} className="info-box">
      {props.message}
    </div>
  );
}

export default InfoBox;
