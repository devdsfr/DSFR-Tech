import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../../core/models/task.model';

/**
 * TaskItem Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por exibir um item de tarefa
 * ✅ OCP: Extensível via @Input/@Output
 * ✅ LSP: Substituível por qualquer implementação
 * ✅ ISP: Recebe apenas task
 * ✅ DIP: Comunica via eventos
 */
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="task-card" [class.completed]="task.completed">
      <div class="task-content">
        <mat-checkbox 
          [checked]="task.completed"
          (change)="onToggleComplete()">
        </mat-checkbox>
        <div class="task-info">
          <h3 [class.completed-text]="task.completed">{{ task.title }}</h3>
          @if (task.description) {
            <p>{{ task.description }}</p>
          }
        </div>
      </div>
      <div class="task-actions">
        <button mat-icon-button (click)="onEdit()">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" (click)="onDelete()">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </mat-card>
  `,
  styles: [`
    .task-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      transition: all 0.2s;
      margin-bottom: 12px;
    }
    .task-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .task-card.completed {
      opacity: 0.7;
      background: #f5f5f5;
    }
    .task-content {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      flex: 1;
    }
    .task-info {
      flex: 1;
    }
    .task-info h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .task-info h3.completed-text {
      text-decoration: line-through;
      color: #999;
    }
    .task-info p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .task-actions {
      display: flex;
      gap: 4px;
    }
  `]
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  
  @Output() toggleComplete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task);
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task);
  }
}