/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addBoat } from "../reducers/userReducer";
import { newBoat } from "../services/boats";

const NewBoat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [boatname, setBoatname] = useState<string>("");

  const handleNewBoat = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newboat = await newBoat({ name: boatname });
    dispatch(addBoat(newboat));
    toast.success(`created new boat ${boatname}`);
    navigate(`/boats/${newboat.id}`);
  };

  const style = {
    backgroundColor: "white",
    padding: "10px",
  };

  return (
    <div className="main">
      <div>
        <div style={style}>
          <form onSubmit={handleNewBoat}>
            <div>
              boat name:{" "}
              <input
<<<<<<< HEAD
                name="boatName"
=======
>>>>>>> 84e61c004a51cedc4805ff5fb2a164621f0e4368
                type="text"
                value={boatname}
                onChange={({ target }) => setBoatname(target.value)}
              />
            </div>
<<<<<<< HEAD
            <button className="button" type="submit">
              Create new boat
            </button>
=======
            <button type="submit">Create new boat</button>
>>>>>>> 84e61c004a51cedc4805ff5fb2a164621f0e4368
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBoat;

//creating a newboat does not yet update the userstate
