import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TodoService } from './state/todo.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (todo of todoService.todos$ | async; track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="todoService.updateTodo(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(protected todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }
}
