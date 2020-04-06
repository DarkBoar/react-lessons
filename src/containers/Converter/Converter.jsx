import React, { Component } from "react";
import classes from "./Converter.module.css";
import Loader from "../../components/UI/Loader/Loader";


class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitcoin: "",
      changeBitcoin: null,
    };
  }

  componentDidMount() {
    this.pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
    this.pricesWs.onmessage = (msg) => {
      const bitcoin = JSON.parse(msg.data);
      const numberBitcoin = Math.round((bitcoin.bitcoin) * 1000) / 1000;
      if (numberBitcoin > this.state.bitcoin) {
        this.setState({
          bitcoin: numberBitcoin,
          changeBitcoin: true,
        });
      } else {
        this.setState({
          bitcoin: numberBitcoin,
          changeBitcoin: false,
        });
      }
    };
  }

  componentWillUnmount() {
    this.pricesWs.close();
  }

  render() {
    const cls = this.state.changeBitcoin ? classes.arrowUp : classes.arrowDown;

    return (
      <div className={classes.listCourse}>
        <h1>Курсы валют</h1>
        <ul>
          {
            this.state.bitcoin
              ? (
                <li>
                  ₿
                  <div className={cls} />
                  <span>
                    {this.state.bitcoin}
                    {" "}
                    $
                  </span>
                </li>
              )
              : <Loader />
          }
        </ul>
      </div>
    );
  }
}

export default Converter;
