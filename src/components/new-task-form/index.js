import React, { Component } from 'react'

import './new-task-form.css'

export class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { label, min, sec } = this.state
    const minNumber = +min
    const secNumber = +sec
    if (
      label.trim() &&
      // min.trim() &&
      // sec.trim() &&
      // Number.isFinite(minNumber) &&
      (minNumber > 0 || secNumber > 0)
      // Number.isFinite(secNumber) &&
      // &&
      // secNumber < 60
    ) {
      onItemAdded(label.trim(), minNumber, secNumber)
    }
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form className="header new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          onChange={this.onChange}
          value={label}
          autoFocus
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="min"
          placeholder="Min"
          onChange={this.onChange}
          value={min}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          name="sec"
          placeholder="Sec"
          onChange={this.onChange}
          value={sec}
        />
        <button type="submit" style={{ display: 'none' }}>
          Отправить
        </button>
      </form>
    )
  }
}
