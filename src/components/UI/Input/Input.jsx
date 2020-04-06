import React from "react";
import classes from "./Input.module.css";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (
  {
    type, valid, errorMessages, label,
    placeholder, value, onChange, indexInput,
    deleteInput, removeAnswer, errorMessage,
  },
) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid()) {
    cls.push(classes.invalid);
  }
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
              <div
                className={classes.removeInput}
                onKeyPress={() => removeAnswer(indexInput)}
              >
                Удалить
              </div>
            )
            : null
        }
      </div>
      {
        isInvalid()
          ? <span>{errorMessage || "Введите верное значение"}</span>
          : null
      }
    </div>
  );
};

export default Input;
