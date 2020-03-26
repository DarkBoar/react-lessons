import React from "react";
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }
  if (props.valid || props.errorMessages) {
    cls.push(classes.inputValid);
  }

  return (
    <div className={cls.join(" ")}>
      {
        props.label ? <label htmlFor={htmlFor}>{props.label}</label> : null
      }
      <div className={classes.blockInput}>
        <input
          type={inputType}
          id={htmlFor}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        {
          props.deleteInput 
          ? <div
              className={classes.removeInput}
              onClick={() => props.removeAnswer(props.indexInput)}
            >
              Удалить
            </div>
          : null
        }
      </div>
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  );
};

export default Input;