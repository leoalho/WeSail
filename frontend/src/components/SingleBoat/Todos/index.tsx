/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState, useEffect } from "react";
import Select from "react-select";
import { Boat, Option, Patch, RootState } from "../../../types";
import TodoCard from "./Card";
import NewTodo from "./NewTodo";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBoat } from "../../../services/boats";

interface Props {
  boat: Boat;
  setBoat: React.Dispatch<React.SetStateAction<Boat | null>>;
}

const Todos = ({ boat, setBoat }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const [newTodo, setNewTodo] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectTodos, setSelectTodos] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<Option[]>([]);

  useEffect(() => {
    setOptions([]);
    const newOptions: Option[] = [];
    if (boat) {
      boat.todos.forEach((todo) => {
        newOptions.push({ value: todo._id, label: todo.value });
      });
      setOptions(newOptions);
    }
  }, [id, boat]);

  const doneTodos = async () => {
    let description = "";
    const todoPatches: Patch[] = [];
    selectedTodos.forEach((todo) => {
      todoPatches.push({ op: "remove", path: "/todos", value: todo.value });
      description = description.concat(" -", todo.label);
    });
    const newBoat = await updateBoat(boat.id, todoPatches);
    if (confirm("Create a log entry?")) {
      navigate("/newLog", {
        state: {
          boat: boat.id,
          participants: [{ value: user.id, label: user.username }],
          description: description,
          type: "maintenance",
        },
      });
    } else {
      setBoat(newBoat);
      setSelectTodos(false);
      setSelectedTodos([]);
    }
  };

  return (
    <>
      <div>
        <b>Todos:</b>
      </div>
      <div className="eventCard">
        {boat.todos.length === 0 ? (
          <div>No Todos</div>
        ) : (
          <ul>
            {boat.todos.map((todo) => (
              <TodoCard key={todo._id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
      {newTodo && (
        <NewTodo
          setNewTodo={setNewTodo}
          setBoat={setBoat}
          boatId={boat.id}
          userId={user.id}
        />
      )}
      {selectTodos && (
        <div className="eventCard">
          <Select
            isMulti
            name="todos"
            options={options}
            onChange={(option) => setSelectedTodos([...option])}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div style={{ marginTop: "5px" }}>
            <button
              style={{ marginRight: "5px" }}
              onClick={() => {
                setSelectTodos(false);
                setSelectedTodos([]);
              }}
            >
              Cancel
            </button>
            <button onClick={doneTodos}> Mark as done</button>
          </div>
        </div>
      )}
      {!newTodo && !selectTodos && (
        <div style={{ margin: "5px" }}>
          <button
            style={{ marginRight: "5px" }}
            onClick={() => {
              setNewTodo(true);
            }}
          >
            Create New
          </button>
          <button onClick={() => setSelectTodos(true)}>
            Mark todos as done
          </button>
        </div>
      )}
    </>
  );
};

export default Todos;
