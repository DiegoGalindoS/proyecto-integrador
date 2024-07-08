import React, { useEffect, useState } from 'react';
import './CompletedTask.css';
import { AiOutlineDelete } from 'react-icons/ai';

function CompletedTasks() {
  const [completedTodos, setCompletedTodos] = useState([]);

  // Cargar tareas completadas desde localStorage al montar el componente
  useEffect(() => {
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  // Función para eliminar tarea completada
  const handleDeleteCompletedTodo = (index) => {
    const updatedCompletedTodos = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(updatedCompletedTodos);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  };

  return (
    <div className="completedTasks">
      <h1>Tareas Completadas</h1>
      <div className="completed-todo-list">
        {completedTodos.length > 0 ? (
          completedTodos.map((item, index) => (
            <div className="completed-todo-list-item" key={index}>
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
          ))
        ) : (
          <p>No hay tareas completadas.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedTasks;
