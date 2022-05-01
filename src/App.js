import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        "Don't allow empty tasks",
        "Add strikethrough style to checked off tasks",
        "Don't allow duplicate tasks",
        "Give it some style ✨",
        "Let users delete tasks"
      ]
    };
  }

  handleAdd(newTask) {
    if (!this.state.tasks.includes(newTask)) {
      this.setState({ tasks: this.state.tasks.concat([newTask]) });
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="navbar-brand">TODO List</h1>
        <h2 className="subheading">Here is what you need to do:</h2>
        <TaskList tasks={this.state.tasks} />
        <TaskAdder onAdd={this.handleAdd.bind(this)} />
      </div>
    );
  }
}

/**
 * Represents a single task in the list.
 *
 * Props:
 *  - text: A string representing the contents of the task.
 */
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: false };
  }

  handleCheck(event) {
    this.setState({ completed: event.target.checked });
  }

  render() {
    return (
      <li className={`list-group-item ${this.state.completed ? "strike" : ""}`}>
        <input
          type="checkbox"
          checked={this.state.completed}
          onChange={this.handleCheck.bind(this)}
        />
        {this.props.text}
      </li>
    );
  }
}

/**
 * Represents a list of tasks.
 *
 * Props:
 *  - tasks: An array of strings, each representing a task.
 */
class TaskList extends React.Component {
  render() {
    //console.log()
    return (
      <ul className="list-group list-group-flush my-4">
        {this.props.tasks.map((task, index) => (
          <Task key={index} text={task} />
        ))}
      </ul>
    );
  }
}

/**
 * Represents a widget that can take user input and call
 * a function to add a new task.
 *
 * Props:
 *  - onAdd: A function that takes a single string with
 *      the text of the new task to add. The function is
 *      called whenever the button is clicked.
 */
class TaskAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick() {
    if (this.state.inputValue !== "") {
      this.props.onAdd(this.state.inputValue);
      this.setState({ inputValue: "" });
    }
  }

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text btn-success" htmlFor="newTask">
            New Task:
          </label>
        </div>
        <input
          className="form-control"
          aria-label="New Task:"
          type="text"
          id="newTask"
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}
        />
        <button
          className="btn btn-outline-success"
          onClick={this.handleClick.bind(this)}
        >
          Add Task
        </button>
      </div>
    );
  }
}
