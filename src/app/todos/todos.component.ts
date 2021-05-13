import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  DialogPosition,
  MatDialog
} from '@angular/material/dialog';

import {
  EditTodoDialogComponent
} from '../edit-todo-dialog/edit-todo-dialog.component';
import {
  ConfirmationDialogComponent
} from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  elementosSelecionados = [];
  todos: Todo[];
  showValidationErrors: boolean;

  constructor(private service: TodoService, private dialog: MatDialog) {}

  dialogPosition: DialogPosition = {
    top: '180px',
  };

  ngOnInit(): void {
    this.todos = this.service.getAllTodos();
    this.elementosSelecionados = this.todos
  }

  onFormSubmit(form: NgForm) {
    this.service.addTodo(new Todo(form.value.text));

    form.reset();
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.updateTodo(index, result);
        
        if (result.completed) {
          let arrayOnlyCompletedTodos = [];
          this.todos.forEach((res) => {
            if (res.completed) {
              arrayOnlyCompletedTodos.push(res);
            }
          });
          this.elementosSelecionados = [];
          this.elementosSelecionados = arrayOnlyCompletedTodos;
        } else {
          let arrayNotCompletedTodos = [];
          this.todos.forEach((res) => { 
            if (!res.completed) {
              arrayNotCompletedTodos.push(res);
            }
            this.elementosSelecionados = [];
            this.elementosSelecionados = arrayNotCompletedTodos;
          });
        }
      }
    });
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.service.deleteTodo(index);
    let todosArray = [];

    if (todo.completed === true) {
      this.elementosSelecionados = [];
      this.todos.forEach((res) => {
        if (res.completed) {
          todosArray.push(res);
          this.elementosSelecionados = todosArray;
        }
      });
    } else {
      this.elementosSelecionados = [];
      this.todos.forEach((res) => {
        if (!res.completed) {
          todosArray.push(res);
          this.elementosSelecionados = todosArray;
        }
      });
    }
  }

  allTodos() {
    this.elementosSelecionados = [];
    return (this.elementosSelecionados = this.todos);
  }

  pendingTodos() {
    let allTodos = this.todos;
    let todosInativos = [];
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].completed === false) {
        todosInativos.push(allTodos[i]);
      }
    }
    this.elementosSelecionados = [];
    return (this.elementosSelecionados = todosInativos);
  }

  completeTodos() {
    let allTodos = this.todos;
    let todosAtivos = [];
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].completed === true) {
        todosAtivos.push(allTodos[i]);
      }
    }
    this.elementosSelecionados = [];
    return (this.elementosSelecionados = todosAtivos);
  }

  deleteAllTodos() {
    this.dialog.open(ConfirmationDialogComponent, {
      position: this.dialogPosition,
    });
    this.elementosSelecionados = this.todos;
  }

  pressEnter() {
    let textbox = document.getElementById('text');
    textbox.addEventListener('onkeypress', () => {
      document.getElementById('botaoAdd').click();
    });
  }
}
