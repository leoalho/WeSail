/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getUser, getUsers } from "../../../services/users";
import { deleteBoat, updateBoat } from "../../../services/boats";
import { Boat, Friend, User, Option, RootState, Patch } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { updateBoats } from "../../../reducers/userReducer";

interface Props {
  applications: Friend[];
  acceptCrewRequest: Function;
  rejectCrewRequest: Function;
  boat: Boat;
  setBoat: React.Dispatch<React.SetStateAction<Boat | null>>;
}

const Owner = ({
  applications,
  acceptCrewRequest,
  rejectCrewRequest,
  boat,
  setBoat,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [users, setUSers] = useState<Option[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Option[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const newUsers: Option[] = [];
    getUsers()
      .then((users: User[]) => {
        users.forEach((user) =>
          newUsers.push({ value: user.id, label: user.username })
        );
      })
      .catch((e) => console.log(e.response.data.error));
    setUSers(newUsers);
  }, []);

  const deleteButton = async () => {
    if (confirm("Are you shure you want to delete?")) {
      await deleteBoat(boat.id);
      const newUser = await getUser(user.id);
      dispatch(updateBoats(newUser.boats));
      toast.success(`Deleted boat ${boat.name}`);
      navigate("/");
    }
  };

  const addOwner = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Select a user first");
      return;
    }
    const patches: Patch[] = [];
    selectedUsers.forEach((selectedUser) =>
      patches.push({ op: "add", path: "/owners", value: selectedUser.value })
    );
    const newBoat = await updateBoat(boat.id, patches);
    toast.success("Added new owner(s).");
    setBoat(newBoat);
    setEdit(false);
    setSelectedUsers([]);
  };

  return (
    <>
      <center>
        <h3>Owner page</h3>
      </center>
      {edit ? (
        <>
          <Select
            isMulti
            name="todos"
            options={users}
            onChange={(option) => setSelectedUsers([...option])}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <button
            className="button"
            onClick={addOwner}
            style={{ marginLeft: "5px", marginTop: "5px" }}
          >
            Add owner
          </button>
          <br />
          <button style={{ margin: "5px" }} onClick={deleteButton}>
            Delete boat
          </button>
          <br />
          <button style={{ margin: "5px" }}>Save</button>
          <button onClick={() => setEdit(!edit)}>Cancel</button>
        </>
      ) : (
        <>
          {applications.length > 0 && <div>Crew applications:</div>}
          {applications.map((application) => (
            <>
              {application.username}{" "}
              <button
                style={{ marginRight: "5px" }}
                onClick={async () => await acceptCrewRequest(application.id)}
              >
                Accept
              </button>
              <button
                onClick={async () => await rejectCrewRequest(application.id)}
              >
                Reject
              </button>
              <br />
            </>
          ))}
          Owners:{" "}
          {boat.owners.map((owner) => (
            <>{owner.username}, </>
          ))}
          <br />
          Crewmembers:{" "}
          {boat.crew.map((crewmember) => (
            <>{crewmember.username}, </>
          ))}
          <br />
          <button onClick={() => setEdit(!edit)}>Edit</button>
        </>
      )}
    </>
  );
};

export default Owner;
