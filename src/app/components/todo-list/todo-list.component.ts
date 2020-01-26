import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  constructor() { }

  ngOnInit() {
    this.filter = "all";
    this.beforeEditCache = '';
    this.idForTodo = 5;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'some title',
        completed: false,
        editing: false
      },{
        id: 2,
        title: 'some title',
        completed: false,
        editing: false
      },{
        id: 3,
        title: 'some title',
        completed: false,
        editing: false
      },{
        id: 4,
        title: 'some title',
        completed: false,
        editing: false
      }
    ]
  }

  addTodo(): void {
    if(this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })
    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo):void {
    if(todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    } 
    todo.editing = false;
  }
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
 
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.some(todo => todo.completed);
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAll(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }


  todosFiltered(): Todo[] {
    switch(this.filter) { 
      case 'active': { 
          return this.todos.filter(todo => !todo.completed);
          break; 
      } 
      case 'completed': { 
          return this.todos.filter(todo => todo.completed);
          break; 
      } 
      default: { 
          return this.todos;
          break; 
      } 
    } 
  }
}


