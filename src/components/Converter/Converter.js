import React, { Component } from 'react';
import classes from "./Converter.module.css";


class Converter extends Component {

  state = {
    valute: []
  }

  componentDidMount() {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ valute: Object.values(data.Valute) }))
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
              const number = Math.round((item.Value) * 10) / 10
              return (
                item.CharCode === "USD" || item.CharCode === "EUR"
                  ? <li key={index}>
                    {item.CharCode} - RU
                    <span>{number}</span>
                  </li>
                  : null
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Converter;