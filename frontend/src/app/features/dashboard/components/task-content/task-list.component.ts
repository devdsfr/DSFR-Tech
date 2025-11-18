import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../../core/models/task.model';
import { TaskItemComponent } from './task-item.component';

/**
 * TaskList Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por listar tarefas
 * ✅ OCP: Extensível via composição
 * ✅ LSP: TaskItemComponent é substituível
 * ✅ ISP: Recebe apenas tasks e isLoading
 * ✅ DIP: Depende de TaskItemComponent (abstração)
 */
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    TaskItemComponent
  ],
  template: `
    @if (isLoading) {
      <div class="loading">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    } @else {
      <div class="tasks-list">
        @for (task of tasks; track task.id) {
          <app-task-item
            [task]="task"
            (toggleComplete)="onToggleComplete($event)"
            (edit)="onEdit($event)"
            (delete)="onDelete($event)">
          </app-task-item>
        } @empty {
          <div class="empty-state">
            <mat-icon>task_alt</mat-icon>
            <p>Nenhuma tarefa nesta lista</p>
            <button mat-raised-button color="primary" (click)="onCreateTask()">
              Criar primeira tarefa
            </button>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }
    .tasks-list {
      display: flex;
      flex-direction: column;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      text-align: center;
      color: #666;
    }
    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }
    .empty-state p {
      margin: 8px 0 16px 0;
    }
  `]
})
export class TaskListComponent {
  @Input({ required: true }) tasks: Task[] = [];
  @Input() isLoading = false;
  
  @Output() toggleComplete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
  @Output() createTask = new EventEmitter<void>();

  onToggleComplete(task: Task): void {
    this.toggleComplete.emit(task);
  }

  onEdit(task: Task): void {
    this.edit.emit(task);
  }

  onDelete(task: Task): void {
    this.delete.emit(task);
  }

  onCreateTask(): void {
    this.createTask.emit();
  }
}