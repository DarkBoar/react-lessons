import React from 'react';
import classes from "./Input.module.css";


const Input = (props) => {
  
  const cls = [classes.Input];

  return (
    <div className={cls.join(" ")}>
      {
        props.label ? <label>{props.label}</label> : null
      }
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;