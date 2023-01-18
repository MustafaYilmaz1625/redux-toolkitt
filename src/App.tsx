import { useState } from "react";
import { add, remove, toggleComplated } from "./features/todoSlice";
import { fetchUser } from "./features/userSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const user =useAppSelector(state => state.user);

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


  const currentUser = user.data && user.data.results[0];

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
      <div>
        <button onClick={() => dispatch(fetchUser())}>Fetch User</button>
        {user.loading && "Loading..."}
        {user.error && user.error}
        {currentUser && (
          <div>
            <p>Name: {currentUser.name.title } {currentUser.name.first } {currentUser.name.last}</p>
           <p> Email: {currentUser.email}</p>
            <p>Avatar : <img src={currentUser.picture.large} /></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
