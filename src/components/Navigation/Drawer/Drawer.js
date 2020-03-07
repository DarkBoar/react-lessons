import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import authIcon from "../../../icons/auth.svg";
import listIcon from "../../../icons/list-test.svg";
import createIcon from "../../../icons/create-test.svg";

const links = [
  {
    to: '/',
    label: 'Список тестов',
    exact: true,
    Icon: listIcon
  },
  {
    to: '/auth',
    label: 'Авторизация',
    exact: false,
    Icon: authIcon
  },
  {
    to: '/quiz-creator',
    label: 'Создать тест',
    exact: false,
    Icon: createIcon
  },
]

class Drawer extends Component {

  renderLinks = () => {
    return links.map((item, index) => {
      return (
        <li key={index}>
          <img
            src={item.Icon}
            alt="icon"
          />
          <NavLink
            to={item.to}
            exact={item.exact}
            activeClassName={classes.active}
          >
            {item.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {

    return (
      <React.Fragment>
        <nav className={classes.Drawer}>
          <div className={classes.menuTitle}>Меню</div>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Drawer;