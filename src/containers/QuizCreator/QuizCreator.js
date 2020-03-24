import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import { createControl } from "../../form/formFramework";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/create";

function createOptionControl(number) {
  return createControl({
    label: `Ответ ${number}`,
    errorMessage: "Значение не может быть пустым",
    id: number
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: "Введите вопрос",
      errorMessage: "Вопрос не может быть пустым"
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2)
  }
}

class QuizCreator extends Component {

  state = {
    nameQuiz: "",
    rightAnswerId: 1,
    formControls: createFormControls(),
    optionSelect: [
      { text: "Ответ 1", value: 1 },
      { text: "Ответ 2", value: 2 }
    ]
  }

  submitHandler(event) {
    event.preventDefault();
  }

  addQuestionHandler = (event) => {
    event.preventDefault();

    const { question } = this.state.formControls;
    const formAnswer = { ...this.state.formControls };
    const answers = [];

    const formAnswerKey = Object.keys(formAnswer).splice(1);
    formAnswerKey.forEach((item, index) => {
      answers.push({text: formAnswer[item].value, id: index + 1})
    })

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: answers
    }

    this.props.createQuizQuestion(questionItem);

    this.setState({
      formControls: createFormControls(),
      rightAnswerId: 1
    })
  }

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    })

    this.props.finishCreateQuiz(this.state.nameQuiz);
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = value;

    formControls[controlName] = control;

    this.setState({
      formControls
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <li key={index}>
          <Input
            label={control.label}
            value={control.value}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
        </li>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  changeNameTest = event => {
    this.setState({
      nameQuiz: event.target.value
    })
  }

  addAnswer = () => {
    const formAnswer = { ...this.state.formControls };
    const optionSelect = [...this.state.optionSelect];

    optionSelect.push({ text: `Ответ ${optionSelect.length + 1}`, value: optionSelect.length + 1 });
    formAnswer[`option${optionSelect.length}`] = createOptionControl(optionSelect.length);

    this.setState({
      formControls: formAnswer,
      optionSelect
    })
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={this.state.optionSelect}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создать тест</h1>
          <div>
            <Input
              label="Тема теста"
              errorMessage="Введите название теста"
              value={this.state.nameQuiz}
              onChange={this.changeNameTest}
            />
          </div>
          <form onSubmit={this.submitHandler}>
            <ul>
              {this.renderControls()}
            </ul>
            {
              this.state.optionSelect.length < 6
              ? <p
                  className={classes.addQuestion}
                  onClick={this.addAnswer}
                >
                  Добавить еще один вариант ответа
                </p>
              : null
            }
            {select}
            <div className={classes.bottomFlex}>
              <Button
                type="success"
                onClick={this.createQuizHandler}
                disabled={this.props.quiz.length === 0}
              >
                Создать тест
              </Button>
              {
                <p
                  onClick={this.addQuestionHandler}
                >
                  {
                    this.props.quiz.length === 0
                      ? "Добавить вопрос"
                      : "Добавить еще один вопрос"
                  }
                </p>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: (nameQuiz) => dispatch(finishCreateQuiz(nameQuiz))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);