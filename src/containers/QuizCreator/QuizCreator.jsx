import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { createQuizQuestion, finishCreateQuiz } from "../../store/actions/create";

function createOptionControl(number, deleteInput = 0) {
  return createControl({
    type: "option",
    deleteInput,
    errorMessage: "Значение не может быть пустым",
    id: number,
  }, {
    required: true,
  });
}

function createFormControls() {
  const arr = [];
  arr.push({
    ...createControl({
      type: "question",
      label: "Введите вопрос",
      errorMessage: "Вопрос не может быть пустым",
    }, {
      required: true,
    }),
  });
  arr.push({
    ...createOptionControl(1),
  }, {
    ...createOptionControl(2),
  });

  return arr;
}

class QuizCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameQuiz: "",
      rightAnswerId: 1,
      formControls: createFormControls(),
      listQuestion: [],
      optionSelect: [
        {
          value: 1,
        },
        {
          value: 2,
        },
      ],
    };
  }

  submitHandler(event) {
    event.preventDefault();
  }

  addQuestionHandler = (event) => {
    event.preventDefault();

    const question = this.state.formControls[0];
    const formAnswer = [...this.state.formControls];
    const answers = [];
    let valid = true;

    formAnswer.splice(0, 1);
    formAnswer.forEach((item) => {
      if (item.value.trim() === "") {
        valid = false;
        // eslint-disable-next-line no-alert
        alert("заполните все пустые поля!");
      }
    });
    if (valid) {
      formAnswer.forEach((item, index) => {
        answers.push({
          text: item.value, id: index + 1,
        });
      });
      const questionItem = {
        question: question.value,
        id: this.props.quiz.length + 1,
        rightAnswerId: this.state.rightAnswerId,
        answers,
      };
      this.props.createQuizQuestion(questionItem);
      this.setState({
        listQuestion: [...this.state.listQuestion, questionItem],
        formControls: createFormControls(),
        rightAnswerId: 1,
        optionSelect: [
          {
            value: 1,
          },
          {
            value: 2,
          },
        ],
      });
    }
  }

  createQuizHandler = (event) => {
    event.preventDefault();

    const question = this.state.formControls[0];
    const formAnswer = [...this.state.formControls];
    const answers = [];
    let valid = true;

    formAnswer.splice(0, 1);
    formAnswer.forEach((item) => {
      if (item.value.trim() === "") {
        valid = false;
        alert("Заполните все поля!");
      }
    });

    if (this.state.nameQuiz === "") {
      // eslint-disable-next-line no-alert
      alert("Заполните тему теста!");
    } else if (valid) {
      formAnswer.forEach((item, index) => {
        answers.push({
          text: item.value, id: index + 1,
        });
      });
      const questionItem = {
        question: question.value,
        id: this.props.quiz.length + 1,
        rightAnswerId: this.state.rightAnswerId,
        answers,
      };
      this.props.createQuizQuestion(questionItem);
      this.setState({
        listQuestion: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        nameQuiz: "",
      });
      this.props.finishCreateQuiz(this.state.nameQuiz);
    }
  }

  changeHandler = (value, index) => {
    const formControls = [...this.state.formControls];
    formControls[index].value = value;

    this.setState({
      formControls,
    });
  }

  renderControls() {
    return this.state.formControls.map((controlName, index) => {
      const { label, value, deleteInput, errorMessage } = controlName;
      return (
        <li key={index}>
          <Input
            indexInput={index}
            label={label || `Ответ ${index}`}
            value={value}
            deleteInput={deleteInput}
            removeAnswer={this.removeAnswer}
            errorMessage={errorMessage}
            onChange={(event) => this.changeHandler(event.target.value, index)}
          />
        </li>
      );
    });
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  }

  changeNameTest = (event) => {
    this.setState({
      nameQuiz: event.target.value,
    });
  }

  removeAnswer = (id) => {
    const optionSelect = [...this.state.optionSelect];
    const formAnswer = [...this.state.formControls];

    formAnswer.splice(id, 1);
    optionSelect.pop();

    this.setState({
      formControls: formAnswer,
      optionSelect,
    });
  }

  addAnswer = () => {
    const formAnswer = [...this.state.formControls];
    const optionSelect = [...this.state.optionSelect];

    formAnswer.push({
      ...createOptionControl(formAnswer.length, 1),
    });
    optionSelect.push({
      value: optionSelect.length + 1,
    });


    this.setState({
      formControls: formAnswer,
      optionSelect,
    });
  }

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={this.state.optionSelect}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создать тест</h1>
          <ul className={classes.listquestion}>
            {
              this.state.listQuestion.map((item, index) => (
                <li key={index}>
                  {item.question}
                  <span>{item.answers[item.rightAnswerId - 1].text}</span>
                </li>
              ))
            }
          </ul>
          <div className={classes.nameTest}>
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
                ? (
                  <button
                    className={classes.addQuestion}
                    onClick={this.addAnswer}
                  >
                    Добавить еще один вариант ответа
                  </button>
                )
                : null
            }
            {select}
            <div className={classes.bottomFlex}>
              <Button
                type="success"
                onClick={this.createQuizHandler}
                disabled={this.state.listQuestion.length === 0}
              >
                Создать тест
              </Button>
              <button
                className={classes.addQuestion}
                onClick={this.addQuestionHandler}
              >
                Добавить еще один вопрос
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: (nameQuiz) => dispatch(finishCreateQuiz(nameQuiz)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
