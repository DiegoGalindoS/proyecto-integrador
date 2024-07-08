import React, { useEffect, useState } from 'react';
import './myList.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi'; 

function MyList() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Función para añadir nueva tarea o actualizar tarea existente
  const handleAddOrUpdateTodo = () => {
    if (isEditing) {
      const updatedTodos = allTodos.map((todo, index) => {
        if (index === editIndex) {
          return { title: newTitle, description: newDescription };
        }
        return todo;
      });
      setTodos(updatedTodos);
      localStorage.setItem('todolist', JSON.stringify(updatedTodos));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newTodoItem = { title: newTitle, description: newDescription };
      const updatedTodoArr = [...allTodos, newTodoItem];
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    }
    setNewTitle("");
    setNewDescription("");
  };

  // Función para editar tarea
  const handleEditTodo = (index) => {
    const todo = allTodos[index];
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Función para eliminar tarea
  const handleDeleteTodo = (index) => {
    const updatedTodos = allTodos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  // Función para eliminar tarea completada
  const handleDeleteCompletedTodo = (index) => {
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  };

  // Función para marcar como completado
  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = now.toLocaleDateString() + ' a las ' + now.toLocaleTimeString();

    const completedItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, completedItem];
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

    handleDeleteTodo(index);
  };

  // Cargar tareas desde localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todolist'));
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  return (
    <div className="myList">
      

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Título</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="¿Cuál es la tarea?"/>
          </div>
          <div className="todo-input-item">
            <label>Descripción</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="¿Cuál es la descripción?"/>
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
                  onClick={() => handleDeleteTodo(index)}/>
                <BsCheckLg
                  className="check-icon"
                  onClick={() => handleComplete(index)} />
                <FiEdit2
                  className="edit-icon"
                  onClick={() => handleEditTodo(index)}/>
              </div>
            </div>
          ))}
          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Completado el: {item.completedOn}</p>
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