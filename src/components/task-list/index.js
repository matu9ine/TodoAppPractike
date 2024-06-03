import React from 'react'

import './task-list.css'
import { Task } from '..'

export const TaskList = ({ todos, onDeleted, onEditing, onItemEdited, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { description, status, id, created, completed, isEditing } = item
    return (
      <Task
        description={description}
        id={id}
        key={id}
        created={created}
        status={status}
        completed={completed}
        isEditing={isEditing}
        onDeleted={() => onDeleted(id)}
        onEditing={() => onEditing(id)}
        onItemEdited={(newDescription) => onItemEdited(id, newDescription)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
