import React from "react";
import classes from "./Button.module.css";

const Button = ({ type, onClick, disabled, children }) => {
  const cls = [
    classes.Button,
    classes[type],
  ];

  return (
    <button
      onClick={onClick}
      className={cls.join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
