import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import exactPropTypes from 'prop-types-exact'
import PropTypes from 'prop-types'

import './task.css'

export class Task extends Component {
  static defaultProps = {
    updateInterval: 5000,
  }

  static propTypes = exactPropTypes({
    description: PropTypes.string,
    created: PropTypes.object,
    id: PropTypes.number,
    status: PropTypes.string,
    completed: PropTypes.bool,
    isEditing: PropTypes.bool,
    onDeleted: PropTypes.func,
    onEditing: PropTypes.func,
    onItemEdited: PropTypes.func,
    onToggleDone: PropTypes.func,
    updateInterval: PropTypes.number,
  })

  constructor(props) {
    super(props)
    this.state = {
      label: props.description,
      time: formatDistanceToNow(props.created, { addSuffix: true, includeSeconds: true }),
    }
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.intervalId = setInterval(this.updateTime, updateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  updateTime = () => {
    const { created } = this.props
    this.setState({
      time: formatDistanceToNow(created, { addSuffix: true, includeSeconds: true }),
    })
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemEdited } = this.props
    const { label } = this.state
    if (label.trim()) {
      onItemEdited(label.trim())
    }
  }

  render() {
    const { description, status, id, onDeleted, onEditing, onToggleDone, completed, isEditing } = this.props
    const classNames = completed ? 'completed' : `${status}`
    const { label, time } = this.state
    return (
      <li key={id} className={classNames}>
        {isEditing ? (
          <form className="" onSubmit={this.onSubmit}>
            <input type="text" className="edit" onChange={this.onLabelChange} value={label} autoFocus />
          </form>
        ) : (
          <div className="view">
            <input id={id} className="toggle" type="checkbox" onClick={onToggleDone} defaultChecked={completed} />
            <label>
              {/* htmlFor={id} */}
              <span className="description">{description}</span>
              <span className="created">created {time}</span>
            </label>
            <button className="icon icon-edit" type="button" onClick={onEditing} />
            <button className="icon icon-destroy bi bi-x" type="button" onClick={onDeleted} />
          </div>
        )}
      </li>
    )
  }
}
