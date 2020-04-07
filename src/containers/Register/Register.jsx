import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Register.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { auth, disableErrorMessage } from "../../store/actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      formControls: {
        email: {
          id: 1,
          value: "",
          type: "email",
          placeholder: "Электронная почта",
        },
        password: {
          id: 2,
          value: "",
          type: "password",
          placeholder: "Пароль",
        },
        confirmPassword: {
          id: 3,
          value: "",
          type: "password",
          placeholder: "Повторите пароль",
        },
      },
    };
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={control.id}
          valid={this.state.valid}
          type={control.type}
          errorMessages={this.props.errorMessage}
          placeholder={control.placeholder}
          value={control.value}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  registerHandler = () => {
    const { email, password, confirmPassword } = this.state.formControls;

    if (password.value === confirmPassword.value) {
      this.props.auth(
        email.value,
        password.value,
        false,
      );
    } else {
      this.setState({
        valid: true,
      });
    }
  };

  componentWillUnmount() {
    this.props.disableErrorMessage();
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {
      ...this.state.formControls,
    };
    const control = {
      ...formControls[controlName],
    };
    control.value = event.target.value;
    formControls[controlName] = control;
    this.setState({
      formControls,
      valid: false,
    });
  };

  render() {
    return (
      <div className={classes.Register}>
        <div>
          <h1>Регистрация</h1>
          <p>Зарегистрируйтесь, чтобы пользоваться программой</p>
          <form onSubmit={this.onSubmitHandler} className={classes.RegisterForm}>
            {this.renderInputs()}
            <Button
              type="success"
              onClick={this.registerHandler}
            >
              Регистрация
            </Button>
            <div className={classes.bottomRegister}>Уже есть профиль?</div>
            <Link to="/auth" className={classes.enter}>
              Войти
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function masStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    disableErrorMessage: () => dispatch(disableErrorMessage()),
  };
}

export default connect(masStateToProps, mapDispatchToProps)(Register);
