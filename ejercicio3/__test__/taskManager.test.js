const TaskManager = require('../src3/taskManager');

describe('Pruebas unitarias para TaskManager', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  it('una tarea recién creada tiene completed: false y propiedades correctas', () => {
    const task = taskManager.addTask('Aprender Jest');
    
    expect(task.id).toBe(1);
    expect(task.title).toBe('Aprender Jest');
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  it('después de addTask, el total de tareas aumenta en 1', () => {
    expect(taskManager.getAll().length).toBe(0);
    
    taskManager.addTask('Tarea 1');
    expect(taskManager.getAll().length).toBe(1);
    
    taskManager.addTask('Tarea 2');
    expect(taskManager.getAll().length).toBe(2);
  });

  it('completeTask cambia el estado correctamente sin afectar otras tareas', () => {
    const task1 = taskManager.addTask('Lavar la ropa');
    const task2 = taskManager.addTask('Estudiar Node.js');
    taskManager.completeTask(task1.id);
    expect(task1.completed).toBe(true);
    expect(task2.completed).toBe(false);
  });

  it('removeTask disminuye el total de tareas', () => {
    const task = taskManager.addTask('Eliminar esta tarea');
    expect(taskManager.getAll().length).toBe(1);
    taskManager.removeTask(task.id);
    expect(taskManager.getAll().length).toBe(0);
  });

  it('getPending() no incluye tareas completadas', () => {
    const task1 = taskManager.addTask('Tarea A');
    const task2 = taskManager.addTask('Tarea B');
    taskManager.completeTask(task1.id);
    const pending = taskManager.getPending();
    expect(pending.length).toBe(1);
    expect(pending[0].id).toBe(task2.id);
  });

  it('getCompleted() no incluye tareas pendientes', () => {
    const task1 = taskManager.addTask('Tarea X');
    taskManager.addTask('Tarea Y');
    taskManager.completeTask(task1.id);
    const completed = taskManager.getCompleted();
    expect(completed.length).toBe(1);
    expect(completed[0].id).toBe(task1.id);
  });

  it('los métodos que reciben un id inválido lanzan error', () => {
    expect(() => taskManager.completeTask(999)).toThrow();
    expect(() => taskManager.removeTask(999)).toThrow();
  });

  it('addTask con title vacío lanza error', () => {
    expect(() => taskManager.addTask('')).toThrow();
    expect(() => taskManager.addTask('   ')).toThrow();
  });
});