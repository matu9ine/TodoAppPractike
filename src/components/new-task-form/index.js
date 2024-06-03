import React, { Component } from 'react'

import './new-task-form.css'

export class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { label } = this.state
    if (label.trim()) {
      onItemAdded(label.trim())
    }
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          value={label}
          placeholder="What needs to be done?"
        />
      </form>
    )
  }
}
