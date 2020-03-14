import React from 'react';
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text'
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(" ")}>
      {
        props.label ? <label htmlFor={htmlFor}>{props.label}</label> : null
      }
      <input
        type={inputType}
        id={htmlFor}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  );
};

export default Input;