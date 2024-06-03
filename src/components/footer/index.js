import React, { Component } from 'react'
import exactPropTypes from 'prop-types-exact'
import PropTypes from 'prop-types'

import { TaskFilter } from '..'

import './footer.css'

export class Footer extends Component {
  static propTypes = exactPropTypes({
    filter: PropTypes.string,
    doneCount: PropTypes.number,
    onDeleted: PropTypes.func,
    onFilterSelect: PropTypes.func,
  })

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { filter, doneCount, onDeleted, onFilterSelect } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <TaskFilter filter={filter} onFilterSelect={onFilterSelect} />
        <button className="clear-completed" type="button" onClick={onDeleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
