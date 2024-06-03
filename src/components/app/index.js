import React, { Component } from 'react'

import { NewTaskForm, TaskList, Footer } from '..'

import './app.css'

export class App extends Component {
  maxId = 100

  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Drink Juice'),
        this.createTodoItem('Drink Tea'),
      ],
    }
  }

  createTodoItem = (description) => {
    const createdTime = new Date()
    return {
      id: this.maxId++,
      status: '',
      description,
      created: createdTime,
      isEditing: false,
      completed: false,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.filter((el) => el.id !== id)
      return {
        todoData: updatedTodoData,
      }
    })
  }

  onEditItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'isEditing'),
      }
    })
  }

  editedItem = (id, newDescription) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            description: newDescription,
            isEditing: false,
          }
        }
        return task
      }),
    }))
  }

  deleteAllDone = () => {
    this.setState(({ todoData }) => {
      const updatedTodoData = todoData.filter((el) => el.completed !== true)
      return {
        todoData: updatedTodoData,
      }
    })
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text)
      const updatedTodoData = [...todoData, newItem]
      return {
        todoData: updatedTodoData,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      }
    })
  }

  onFilterSelect = (filter) => {
    this.setState({ filter })
  }

  setFilter = (items, filter) => {
    switch (filter) {
      case 'done':
        return items.filter((item) => item.completed)
      case 'active':
        return items.filter((item) => !item.completed)
      case 'all':
        return items
      default:
        return items
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    }
    // const updatedTodoData = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
    // const updatedTodoData = arr.with(idx, newItem)
    return arr.with(idx, newItem)
  }

  render() {
    const { todoData, filter } = this.state
    const data = this.setFilter(todoData, filter)
    const doneCount = todoData.filter((el) => !el.completed).length
    return (
      <div className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={data}
            onDeleted={this.deleteItem}
            onEditing={this.onEditItem}
            onItemEdited={this.editedItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            filter={filter}
            doneCount={doneCount}
            onDeleted={this.deleteAllDone}
            onFilterSelect={this.onFilterSelect}
          />
        </section>
      </div>
    )
  }
}
