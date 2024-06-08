import React from 'react'

import './task-list.css'
import { Task } from '..'

export const TaskList = ({ todos, onPlay, onPause, onDeleted, onEditing, onItemEdited, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { description, minNumber, secNumber, status, id, created, completed, isEditing } = item
    return (
      <Task
        id={id}
        key={id}
        description={description}
        minNumber={minNumber}
        secNumber={secNumber}
        created={created}
        status={status}
        completed={completed}
        onPlay={() => onPlay(id)}
        onPause={() => onPause(id)}
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
