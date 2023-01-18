import { useState } from "react";
import { add, remove, toggleComplated } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  const onDelete = (id: string) => {
    dispatch(remove(id));
  };
  const toggle = (id: string) => {
    dispatch(toggleComplated(id));
  };

  return (
    <div className="App">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={onSave}>Save</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
            <span>{todo.title}</span>
            <button onClick={() => toggle(todo.id)}>
              {todo.completed ? "Mark Not Completed" : "Mark Complated"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
