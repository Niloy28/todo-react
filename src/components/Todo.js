import React, { useState, useRef, useEffect } from 'react';
import usePrevious from '../usePrevious';

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const wasEditing = usePrevious(isEditing);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName.trim() !== '') {
      props.editTask(props.id, newName.trim());
      setNewName('');
      setEditing(false);
    }
  }

  function cancelEdit(e) {
    setEditing(false);
    setNewName('');
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor={props.id} className="todo-label">
          New name for {props.name}
        </label>
        <input
          type="text"
          id={props.id}
          className="todo-text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button className="btn todo-cancel" type="button" onClick={cancelEdit}>
          Cancel
        </button>
        <span className="visually-hidden">renaming {props.name}</span>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
        </button>
        <span className="visually-hidden">new name for {props.name}</span>
      </div>
    </form>
  );

  const viewingTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  console.log('main render');

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewingTemplate}
    </li>
  );
}

export default Todo;
