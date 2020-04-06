import React from "react";
import classes from "./Select.module.css";

const Select = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option
            key={option.value + index}
            value={option.value}
          >
            {`Ответ ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
