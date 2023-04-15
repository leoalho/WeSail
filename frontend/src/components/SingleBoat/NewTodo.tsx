/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { updateBoat } from "../../services/boats";
import { Boat, Patch, TodoEntry } from "../../types";

interface Props {
  setNewTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setBoat: React.Dispatch<React.SetStateAction<Boat | null>>;
  boatId: string;
  userId: string;
}

const NewTodo = ({ setNewTodo, setBoat, boatId, userId }: Props) => {
  const [todoValue, setTodoValue] = useState<string>("");

  const saveTodo = async () => {
    const todo: TodoEntry = {
      created: new Date(),
      createdBy: userId,
      value: todoValue,
    };
    const patch: Patch[] = [
      {
        op: "add",
        value: todo,
        path: "/todos",
      },
    ];
    const newBoat = await updateBoat(boatId, patch);
    setTodoValue("");
    setBoat(newBoat);
    setNewTodo(false);
  };

  return (
    <div style={{ marginTop: "5px" }}>
      <input
        type="text"
        value={todoValue}
        onChange={({ target }) => setTodoValue(target.value)}
      ></input>
      <button
        className="button"
        onClick={saveTodo}
        style={{ marginRight: "5px" }}
      >
        save
      </button>
      <button
        className="button"
        onClick={() => {
          setNewTodo(false);
        }}
      >
        cancel
      </button>
    </div>
  );
};

export default NewTodo;
