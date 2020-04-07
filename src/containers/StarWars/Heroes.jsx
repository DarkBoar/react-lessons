import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./Heroes.module.css";

class Heroes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      loading: true,
    };
  }

  componentDidMount() {
    const url = "https://swapi.co/api/people/";
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({
        heroes: [...data.results], loading: false,
      }));
  }

  render() {
    return (
      <div className={classes.Heroes}>
        {
        this.state.loading
          ? <div className={classes.loadingCenter}><Loader /></div>
          : (
            <TableContainer>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Имя героя</TableCell>
                    <TableCell align="right">Рост</TableCell>
                    <TableCell align="right">Пол</TableCell>
                    <TableCell align="right">Цвет волос</TableCell>
                    <TableCell align="right">Вес</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.heroes.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {row.height}
                        {" "}
                        см
                      </TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.hair_color}</TableCell>
                      <TableCell align="right">
                        {row.mass}
                        {" "}
                        кг
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
       }
      </div>
    );
  }
}

export default Heroes;
