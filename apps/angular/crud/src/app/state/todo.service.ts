import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, withLatestFrom } from 'rxjs';

import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => this.todos.next(todos));
  }

  updateTodo(todo: Todo) {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(withLatestFrom(this.todos$))
      .subscribe(([todoUpdated, todos]) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === todoUpdated.id ? todoUpdated : todo,
        );
        this.todos.next(updatedTodos);
      });
  }
}
