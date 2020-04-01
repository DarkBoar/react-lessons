import React, { Component } from 'react';
import classes from "./Converter.module.css";


class Converter extends Component {

  state = {
    valute: []
  }

  async componentDidMount() {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    const course = await fetch(url)
      .then(response => response.json())
    const arrNameCourse = Object.values(course.Valute);

    this.setState({valute: arrNameCourse})
  }

  render() {
    return (
      <div className={classes.listCourse}>
        <div className={classes.drawerCourse}>
          Курсы валют
        </div>
        <h1>Курсы валют</h1>
        <ul>
          {
            this.state.valute.map((item, index) => {
              const number = Math.round((item.Value)*100)/100
              return (
                <li key={index}>
                  {item.CharCode} - RU
                  <span>{number}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Converter;