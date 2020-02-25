import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
  {
    to: '/',
    label: 'Список',
    exact: true
  },
  {
    to: '/auth',
    label: 'Авторизация',
    exact: false
  },
  {
    to: '/quiz-creator',
    label: 'Создать тест',
    exact: false
  },
]

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks = () => {
    return links.map((item, index) => {
      return (
        <li key={index}>
          <NavLink
            to={item.to}
            exact={item.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {item.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [
      classes.Drawer
    ]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <React.Fragment>
        <nav className={cls.join(" ")}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        { !this.props.isOpen ? null : <Backdrop onClick={this.props.onClose} /> } 
      </React.Fragment>
    )
  }
}

export default Drawer;