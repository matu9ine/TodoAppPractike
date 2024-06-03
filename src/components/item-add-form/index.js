import React, { Component } from 'react'

import './item-add-form.css'

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
    onItemAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { onItemAdded } = this.props
    const { label } = this.state
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          value={label}
          placeholder="What needs to be done?"
        />
        <button className="btn btn-outline-secondary" type="button" onClick={() => onItemAdded('Hello')}>
          Add element
        </button>
      </form>
    )
  }
}
