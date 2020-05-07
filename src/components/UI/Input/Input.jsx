import React from "react";
import classes from "./Input.module.css";

const Input = (
  {
    type, valid, errorMessages, label,
    placeholder, value, onChange, indexInput,
    deleteInput, removeAnswer,
  },
) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (valid || errorMessages) {
    cls.push(classes.inputValid);
  }

  return (
    <div className={cls.join(" ")}>
      {
        label ? <label htmlFor={htmlFor}>{label}</label> : null
      }
      <div className={classes.blockInput}>
        <input
          type={inputType}
          id={htmlFor}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {
          deleteInput
            ? (
              <button
                className={classes.removeInput}
                onClick={() => removeAnswer(indexInput)}
              >
                Удалить
              </button>
            )
            : null
        }
      </div>
    </div>
  );
};

export default Input;
