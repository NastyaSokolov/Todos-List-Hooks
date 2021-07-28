import { functions } from "lodash";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

//creating my hook
function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => {
      setValue("");
    },
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  // const [value, setValue] = useState("");
  const input = useInputValue("");
  function submitHandler(event) {
    event.preventDefault();
    console.log(event);
    // if(value.trim())
    if (input.value().trim()) {
      // onCreate(value)
      onCreate(input.value());
      // setValue("");
      input.clear();
    }
  }
  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      {/* <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input> */}
      <input {...input.bind}></input>
      <button type="submit">Add Todo</button>
    </form>
  );
}
AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
export default AddTodo;
