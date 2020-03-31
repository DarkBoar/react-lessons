import React, { Component } from "react";
import classes from "./Drawer.module.css";
import { NavLink } from "react-router-dom";
import ListTest from "./icons/ListTest";
import AuthSvg from "./icons/AuthSvg";
import CreateSvg from "./icons/CreateSvg";

class Drawer extends Component {

  renderLinks = (links) => {
    return links.map((item, index) => {
      return (
        <li key={index}>
          <NavLink
            to={item.to}
            exact={item.exact}
            activeClassName={classes.active}
          >
            { item.Icon ? item.Icon : null }
            {item.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {

    const links = [
      {
        to: '/',
        label: 'Список тестов',
        exact: true,
        Icon: <ListTest />
      }
    ];

    if (this.props.isAuthenticated) {
      links.push(
        {
          to: '/quiz-creator',
          label: 'Создать тест',
          exact: false,
          Icon: <CreateSvg />
        },
        {
          to: '/tasks',
          label: 'Список задач',
          exact: false,
        },
        {
          to: '/logout',
          label: 'Выйти из системы',
          exact: false,
        }
      )
    } else {
      links.push(
        {
          to: '/auth',
          label: 'Авторизация',
          exact: false,
          Icon: <AuthSvg />
        }
      )
    }

    const cls = [classes.menuTitle];
    if (!this.props.isAuthenticated) {
      cls.push(classes.isLogout)
    }

    return (
      <>
        <nav className={classes.Drawer}>
          <div className={cls.join(" ")}>Меню</div>
          {
            this.props.isAuthenticated ? <div className={classes.login}>{this.props.isNameLogin}</div> : null
          }
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
      </>
    )
  }
}

export default Drawer;