import React, { useState, useEffect, useRef } from "react";

const Todos = () => {
  const [inputVal, setInputVal] = useState(""),
    storedTodos = localStorage.getItem("todosItems"),
    initialTodos = storedTodos ? JSON.parse(storedTodos) : [],
    [todostask, setTodosTask] = useState(initialTodos),
    [empty, setEmpty] = useState(false),
    refInput = useRef(null);

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

    if (event.detail === 2) {
      refInput.current.value = todostask[idx].task;
      // let editTask = refInput.current.value
      // console.log(refInput.current.value)
    }
  };

  const itemLeft = todostask.filter((ele) => {
    if (!ele.completed) {
      return ele;
    }
  });

  return (
    <div className="w-[90%] 2xl:w-[70%] mx-auto bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form onSubmit={submitEvent}>
        <div>
          <input
            type="text"
            placeholder={empty ? "Field is required" : "What needs to be done?"}
            name="search"
            value={inputVal}
            ref={refInput}
            className={`${
              empty ? "placeholder:text-red-700" : "placeholder:text-[#989898]"
            } common outline-none`}
            onKeyDown={todosHandler}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>
      </form>
      <div>
        <ul>
          {todostask.map((value, idx) => (
            <li
              key={idx}
              className={`${
                value.completed ? "line-through completed" : ""
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
            <li className="basis-[20%] border-[1px] border-[#EFD5D5] block text-center cursor-pointer">
              All
            </li>
            <li className="basis-[38%] block text-center cursor-pointer">
              Active
            </li>
            <li className={`basis-[38%] block text-center cursor-pointer`}>
              Completed
            </li>
          </ul>
          <button>Clear completed</button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
