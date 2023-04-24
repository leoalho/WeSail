import { Todo } from "../../../types";

type Props = {
  todo: Todo;
};

const TodoCard = ({ todo }: Props) => {
  return <li>{todo.value}</li>;
};

export default TodoCard;
