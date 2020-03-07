import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: '/',
    label: 'Список тестов',
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

  renderLinks = () => {
    return links.map((item, index) => {
      return (
        <li key={index}>
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