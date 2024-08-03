import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './myList.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';

function MyList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/lists/${id}`);
        if (response.ok) {
          const list = await response.json();
          setListName(list.nombre);
        } else {
          console.error('Failed to fetch list:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchList();
  }, [id]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/lists/${id}/todos`);
        if (response.ok) {
          const todos = await response.json();
          setTodos(todos.filter(todo => todo.status === 'incomplete'));
          setCompletedTodos(todos.filter(todo => todo.status === 'complete'));
        } else {
          console.error('Failed to fetch todos:', await response.text());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTodos();
  }, [id]);

  const handleAddOrUpdateTodo = async () => {
    if (isEditing) {
      const updatedTodo = { title: newTitle, description: newDescription };
      const response = await fetch(`http://localhost:3001/api/todos/${allTodos[editIndex].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const result = await response.json();
      const updatedTodos = allTodos.map((todo, index) => (index === editIndex ? result : todo));
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newTodo = { title: newTitle, description: newDescription, status: 'incomplete' };
      const response = await fetch(`http://localhost:3001/api/lists/${id}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const result = await response.json();
      setTodos([...allTodos, result]);
    }
    setNewTitle("");
    setNewDescription("");
  };

  const handleEditTodo = (index) => {
    const todo = allTodos[index];
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteTodo = async (index) => {
    await fetch(`http://localhost:3001/api/todos/${allTodos[index].id}`, { method: 'DELETE' });
    setTodos(allTodos.filter((_, i) => i !== index));
  };

  const handleDeleteCompletedTodo = async (index) => {
    await fetch(`http://localhost:3001/api/todos/${completedTodos[index].id}`, { method: 'DELETE' });
    setCompletedTodos(completedTodos.filter((_, i) => i !== index));
  };

  const handleComplete = async (index) => {
    const now = new Date();
    const completedOn = now.toISOString();
    const completedItem = { ...allTodos[index], status: 'complete', completed_on: completedOn };
    const response = await fetch(`http://localhost:3001/api/todos/${allTodos[index].id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completedItem),
    });
    const result = await response.json();
    setCompletedTodos([...completedTodos, result]);
    setTodos(allTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="myList">
      <div className="todo-wrapper">
        <h1 className="list-title">{listName}</h1>
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Título</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="¿Cuál es la tarea?" />
          </div>
          <div className="todo-input-item">
            <label>Descripción</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="¿Cuál es la descripción?" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddOrUpdateTodo} className="primaryBtn">
              {isEditing ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            type="button"
            className={`secondaryBtn ${!isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}>
            Por Hacer
          </button>
          <button
            type="button"
            className={`secondaryBtn ${isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}>
            Completos
          </button>
        </div>
        <div className="todo-list">
          {!isCompleteScreen && allTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteTodo(index)} />
                <BsCheckLg
                  className="check-icon"
                  onClick={() => handleComplete(index)} />
                <FiEdit2
                  className="edit-icon"
                  onClick={() => handleEditTodo(index)} />
              </div>
            </div>
          ))}
          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Completado el: {new Date(item.completed_on).toLocaleString()}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteCompletedTodo(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyList;

