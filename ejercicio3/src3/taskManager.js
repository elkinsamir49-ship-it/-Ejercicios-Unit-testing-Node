class TaskManager {
  constructor() {
    this._tasks = [];
    this._nextId = 1; 
  }

  addTask(title) {
    if (!title || title.trim() === '') {
      throw new Error('El título de la tarea no puede estar vacío.');
    }

    const newTask = {
      id: this._nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };

    this._tasks.push(newTask);
    return newTask;
  }
  completeTask(id) {
    const task = this._tasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`No se encontró la tarea con el ID: ${id}`);
    }
    task.completed = true;
  }


  removeTask(id) {
    const index = this._tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`No se encontró la tarea con el ID: ${id}`);
    }
    this._tasks.splice(index, 1);
  }

  getPending() {
    return this._tasks.filter(t => !t.completed);
  }

  getCompleted() {
    return this._tasks.filter(t => t.completed);
  }

  getAll() {
    return this._tasks;
  }
}

module.exports = TaskManager;