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
        this.createTodoItem('Drink Coffee', 10, 20),
        this.createTodoItem('Drink Juice', 10, 20),
        this.createTodoItem('Drink Tea', 10, 20),
      ],
    }
  }

  createTodoItem = (description, minNumber, secNumber) => {
    const createdTime = new Date()
    const timeSpent = minNumber * 60 + secNumber
    return {
      id: this.maxId++,
      status: '',
      description,
      minNumber: Math.floor(timeSpent / 60),
      secNumber: timeSpent % 60,
      created: createdTime,
      isEditing: false,
      completed: false,
      isTimerRunning: false,
      timerStart: 0,
      elapsedTime: 0,
      timerId: null,
      timeSpent,
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

  onPlay = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => {
        if (task.id === id && !task.isTimerRunning) {
          const now = Date.now()
          const timerId = setInterval(() => {
            this.updateTime(id)
          }, 1000)

          return {
            ...task,
            isTimerRunning: true,
            timerStart: now,
            timerId,
          }
        }
        return task
      }),
    }))
  }

  onPause = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => {
        if (task.id === id && task.isTimerRunning) {
          const elapsedTimeInSeconds = Math.floor((Date.now() - task.timerStart) / 1000)
          const timeSpent = task.timeSpent - elapsedTimeInSeconds

          clearInterval(task.timerId)

          return {
            ...task,
            isTimerRunning: false,
            timerId: null,
            timeSpent,
            minNumber: Math.floor(timeSpent / 60),
            secNumber: timeSpent % 60,
          }
        }
        return task
      }),
    }))
  }

  updateTime = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((task) => {
        if (task.id === id && task.isTimerRunning) {
          const elapsedTimeInSeconds = task.timeSpent - Math.floor((Date.now() - task.timerStart) / 1000) // Добавляем к прошедшему времени уже учтенное время
          const newMinNumber = Math.floor(elapsedTimeInSeconds / 60)
          const newSecNumber = elapsedTimeInSeconds % 60
          if (newMinNumber <= 0 && newSecNumber <= 0) {
            clearInterval(task.timerId)
            return {
              ...task,
              isTimerRunning: false,
              timerId: null,
              completed: true, // Отметим задачу выполненной, если время истекло
              timeSpent: 0, // Сбрасываем время
              minNumber: 0, // Сбрасываем минуты
              secNumber: 0, // Сбрасываем секунды
            }
          }
          return {
            ...task,
            elapsedTime: elapsedTimeInSeconds,
            minNumber: newMinNumber,
            secNumber: newSecNumber,
          }
        }
        return task
      }),
    }))
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

  addItem = (text, minNumber, secNumber) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text, minNumber, secNumber)
      const updatedTodoData = [...todoData, newItem]
      return {
        todoData: updatedTodoData,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => {
          if (task.id === id) {
            let updatedTask = { ...task, completed: !task.completed }
            if (task.isTimerRunning) {
              clearInterval(task.timerId)
              const elapsedTimeInSeconds = task.timeSpent - Math.floor((Date.now() - task.timerStart) / 1000)
              updatedTask = {
                ...updatedTask,
                isTimerRunning: false,
                timerId: null,
                timeSpent: elapsedTimeInSeconds,
                minNumber: Math.floor(elapsedTimeInSeconds / 60),
                secNumber: elapsedTimeInSeconds % 60,
              }
            }
            return updatedTask
          }
          return task
        }),
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
            onPlay={this.onPlay}
            onPause={this.onPause}
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
