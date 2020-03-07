import React, { Component } from 'react';
import classes from './Register.module.css';
import { Link } from "react-router-dom";
import Input from '../../components/UI/Input/Input';
import Axios from "axios";
import is from "is_js";
import Button from '../../components/UI/Button/Button';

class Register extends Component {

  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        placeholder: "Электронная почта",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: "",
        type: "password",
        placeholder: "Пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
      confirmPassword: {
        value: "",
        type: "password",
        placeholder: "Повторите пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      }
    }
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          placeholder={control.placeholder}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    }
    try {
      const response = await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHhnwoRYlS3nePNyT5c9ZcixVvCjrqtSQ', authData);

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== "" && isValid
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
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
              disabled={!this.state.isFormValid}
            >
              Регистрация
            </Button>
            <div className={classes.bottomRegister}>Уже есть профиль?</div>
            <Link to={"/auth"} className={classes.enter}>
              Войти
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;