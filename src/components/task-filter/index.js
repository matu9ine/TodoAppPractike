import React, { Component } from 'react'
import exactPropTypes from 'prop-types-exact'
import PropTypes from 'prop-types'

import './task-filter.css'

export class TaskFilter extends Component {
  static propTypes = exactPropTypes({
    filter: PropTypes.string,
    onFilterSelect: PropTypes.func,
  })

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { filter, onFilterSelect } = this.props

    const buttonsData = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'done', label: 'Completed' },
    ]
    const buttons = buttonsData.map(({ name, label }) => {
      const active = filter === name
      const className = active ? 'selected' : ''
      return (
        <li key={name}>
          <button type="button" className={`btn ${className}`} onClick={() => onFilterSelect(name)}>
            {label}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}
