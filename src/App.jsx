import React, { useEffect, useState } from "react";

const App = () => {
  const [newItem, setNewItem] = useState("");

  //   Whatever returns from the function => Default value
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("todos");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [editingID, setEditingID] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newItem === "") {
      return null;
    }

    setTodos([
      ...todos,
      {
        title: newItem,
        id: Math.floor(Math.random() * 1000) + 1,
        completed: false,
      },
    ]);

    setNewItem("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const removeTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const startEditing = (id, title) => {
    setEditingID(id);
    setEditingTitle(title);
  };

  const handleEditing = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: editingTitle };
        }
        return todo;
      })
    );
    setEditingID(null);
    setEditingTitle("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Submit</button>
      </form>

      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length == 0 ? (<p>No todo</p>
        
        ) : (
            todos.map((todo) => {
                return (
                  <li key={todo.id}>
                    {editingID === todo.id ? (
                      <>
                        <input
                          className="edit-input"
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                        />
                        <button
                          className="save-button btn"
                          onClick={() => {
                            handleEditing(todo.id);
                          }}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <label>
                          <input
                            className="checkbox-input"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => {
                              toggleTodo(todo.id, todo.completed);
                            }}
                          />
                          {todo.title}
                        </label>
                        <button
                          onClick={() => {
                            removeTodo(todo.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
      
                        <button
                          className="btn"
                          onClick={() => {
                            startEditing(todo.id, todo.title);
                          }}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                );
              })
        )}

      </ul>
    </>
  );
};

export default App;
