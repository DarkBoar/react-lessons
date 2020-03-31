import React, { Component } from 'react';
import classes from "./Tasks.module.css";
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';


class Tasks extends Component {

  state = {
    value: "",
    tasks: []
  }

  setValueInput = value => {
    this.setState({ value: value });
  }

  addTaskHandle = () => {
    if (this.state.value === "") {
      
    } else {
      this.setState({
        tasks: [ ...this.state.tasks, this.state.value ],
        value: ""
      })
    }
  }

  render() {
    return (
      <div className={classes.Tasks}>
        <h1>Создание задач</h1>
        <div className={classes.taskContainer}>
          <Input
            value={this.state.value}
            placeholder="Введите задачу..."
            onChange={event => this.setValueInput(event.target.value)}
          />
          <Button
            type="success"
            onClick={this.addTaskHandle}
          >
            Добавить задачу
          </Button>
        </div>
        <ul>
          {this.state.tasks.map((item, index) => {
            return (
              <li key={index}>
                {index + 1}.{item}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Tasks;