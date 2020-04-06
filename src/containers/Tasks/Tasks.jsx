import React, { Component } from "react";
import classes from "./Tasks.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";


class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tasks: [],
      valid: false,
    };
  }

  setValueInput = (value) => {
    if (value !== "") {
      this.setState({
        value,
        valid: false,
      });
    } else {
      this.setState({
        value,
      });
    }
  }

  addTaskHandle = () => {
    if (this.state.value === "") {
      this.setState({
        valid: true,
      });
    } else {
      this.setState({
        tasks: [...this.state.tasks, this.state.value],
        value: "",
      });
    }
  }

  render() {
    return (
      <div className={classes.Tasks}>
        <h1>Создание задач</h1>
        <div className={classes.taskContainer}>
          <Input
            value={this.state.value}
            valid={this.state.valid}
            placeholder="Введите задачу..."
            onChange={(event) => this.setValueInput(event.target.value)}
          />
          <Button
            type="success"
            onClick={this.addTaskHandle}
          >
            Добавить задачу
          </Button>
        </div>
        <ul>
          {this.state.tasks.map((item, index) => (
            <li key={index}>
              {index + 1}
              .
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Tasks;
