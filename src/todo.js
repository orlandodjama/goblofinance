import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addTodo } from "./redux/actions/app";

const ToDo = () => {  
  const [todo, setTodo] = useState("");
  const setTodoFunc = e => {
    dispatch(addTodo(todo));
  };
  // redux hook methods start
  const todoItemAdded = useSelector(state => {
    return {
      todoItem: state.app.todoItem,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  // redux hook methods end
  return (    
    <>      
      <Input
        type="text"
        name="text"
        id="text"
        value={todo}
        onChange​={e => setTodo(e.target.value)}
        placeholder="Enter item name"
      />
      <Button onClick​={setTodoFunc}>Add</Button>
    </>  
  );
};