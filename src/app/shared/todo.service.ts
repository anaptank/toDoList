import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  form: FormGroup;

  todos: Todo[] = [
    new Todo('Este é um teste', false),
    new Todo('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', true),
    new Todo(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec dui. Et odio pellentesque diam volutpat commodo sed. Blandit cursus risus at ultrices mi tempus imperdiet. Ac auctor augue mauris augue neque gravida in fermentum. Urna nunc id cursus metus aliquam eleifend mi in nulla.',
      true
    ),
  ];

  getAllTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  deleteAllTodos() {
    this.todos.splice(0);
    this.todos;
  }

  updateTodo(index: number, updateTodo: Todo) {
    this.todos[index] = updateTodo;
  }
}
