import React, { useState, useEffect } from "react";

const Todos = () => {
  const [inputVal, setInputVal] = useState(""),
    storedTodos = localStorage.getItem("todosItems"),
    initialTodos = storedTodos ? JSON.parse(storedTodos) : [],
    [todostask, setTodosTask] = useState(initialTodos),
    [empty, setEmpty] = useState(false),
    [completedItems, setCompletedItems] = useState([]),
    [activeTodos, setActiveTodos] = useState([]),
    [done, setDone] = useState(false),
    [all, setAll] = useState(true);

  const submitEvent = (e) => {
    e.preventDefault();
  };

  const todosHandler = (e) => {
    if (e.key === "Enter") {
      if (inputVal !== "") {
        setTodosTask([...todostask, { task: inputVal, completed: false }]);
        setInputVal("");
        setEmpty(false);
      } else {
        setEmpty(true);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("todosItems", JSON.stringify(todostask));
  }, [todostask]);

  const completedTodo = (event, idx) => {
    const updatedTodos = [...todostask];
    updatedTodos[idx].completed = !updatedTodos[idx].completed;
    setTodosTask(updatedTodos);
  };

  const allEvent = () => {
    setAll(true);
    setDone(false);
  };

  const completedEvent = () => {
    setAll(false);
    setDone(true);
    const completedTodos = todostask.filter((element) => element.completed);
    setCompletedItems(completedTodos);
  };

  const activeEvent = () => {
    setAll(false);
    setDone(false);
    const activeItems = todostask.filter((element) => !element.completed);
    setActiveTodos(activeItems);
  };

  const clearCompletedTodos = () => {
    const removeCompleteTodos = todostask.filter((remove) => !remove.completed);
    setTodosTask(removeCompleteTodos);
    setCompletedItems([])
  };

  const itemLeft = todostask.filter((ele) => !ele.completed);

  return (
    <div className="w-[90%] 2xl:w-[70%] mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form onSubmit={submitEvent}>
        <div>
          <input
            type="text"
            placeholder={empty ? "Field is required" : "What needs to be done?"}
            name="search"
            value={inputVal}
            className={`${empty ? "placeholder:text-red-700" : "placeholder:text-[#989898]"
              } common outline-none`}
            onKeyDown={todosHandler}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>
      </form>
      <div>
        <ul>
          {!done &&
            (all ? todostask : activeTodos).map((value, idx) => (
              <li
                key={idx}
                className={`${value.completed ? "line-through completed" : ""
                  } common relative icon cursor-pointer`}
                onClick={(event) => completedTodo(event, idx)}
              >
                {value.task}
              </li>
            ))}
          {done &&
            completedItems.map((value, idx) => (
              <li
                key={idx}
                className={`${value.completed ? "line-through completed" : ""
                  } common relative icon cursor-pointer`}
                onClick={(event) => completedTodo(event, idx)}
              >
                {value.task}
              </li>
            ))}
        </ul>
        <div className="flex justify-between px-[15px] items-center">
          <span>
            {itemLeft.length} item{itemLeft.length !== 1 ? "s" : ""} left
          </span>
          <ul className="flex justify-between py-3 basis-[45%] text-black gap-2">
            <li
              className={`${all ? "active" : ""} basis-[20%] list-common`}
              onClick={() => allEvent()}
            >
              All
            </li>
            <li
              className={`${!done && !all ? "active" : ""
                } basis-[25%] list-common`}
              onClick={() => activeEvent()}
            >
              Active
            </li>
            <li
              className={`${done ? "active" : ""} basis-[45%] list-common`}
              onClick={() => completedEvent()}
            >
              Completed
            </li>
          </ul>
          <button
            onClick={() => {
              clearCompletedTodos();
            }}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
