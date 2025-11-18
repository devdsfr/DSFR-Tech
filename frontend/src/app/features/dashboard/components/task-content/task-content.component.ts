import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../core/models/task.model';
import { Tasklist } from '../../../../core/models/tasklist.model';
import { TaskListComponent } from './task-list.component';
import { TaskFormComponent } from './task-form.component';

/**
 * TaskContent Component
 * 
 * SOLID Principles Applied:
 * 
 * SRP: Responsável APENAS por orquestrar a área de conteúdo de tarefas
 * OCP: Extensível via composição
 * LSP: Componentes filhos são substituíveis
 * ISP: Cada componente recebe apenas o necessário
 * DIP: Depende de abstrações (TaskListComponent, TaskFormComponent)
 */
@Component({
  selector: 'app-task-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TaskListComponent,
    TaskFormComponent
  ],
  template: `
    <div class="content">
      @if (selectedTasklist) {
        <div class="content-header">
          <div>
            <h1>{{ selectedTasklist.name }}</h1>
            <p class="subtitle">{{ tasks.length }} tarefa(s)</p>
          </div>
          <button mat-raised-button color="primary" (click)="toggleForm()">
            <mat-icon>add</mat-icon>
            Nova Tarefa
          </button>
        </div>

        @if (showForm) {
          <app-task-form
            [editingTask]="editingTask"
            (save)="onSaveTask($event)"
            (cancel)="onCancelForm()">
          </app-task-form>
        }

        <app-task-list
          [tasks]="tasks"
          [isLoading]="isLoading"
          (toggleComplete)="onToggleComplete($event)"
          (edit)="onEditTask($event)"
          (delete)="onDeleteTask($event)"
          (createTask)="toggleForm()">
        </app-task-list>
      } @else {
        <div class="empty-state-main">
          <mat-icon>checklist_rtl</mat-icon>
          <h2>Selecione ou crie uma lista</h2>
          <p>Organize suas tarefas criando listas personalizadas</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .content-header h1 {
      margin: 0 0 4px 0;
      font-size: 28px;
      color: #333;
    }
    .subtitle {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    .empty-state-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      color: #666;
    }
    .empty-state-main mat-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #e0e0e0;
      margin-bottom: 24px;
    }
    .empty-state-main h2 {
      margin: 0 0 8px 0;
      color: #333;
    }
    .empty-state-main p {
      margin: 0;
      font-size: 16px;
    }
  `]
})
export class TaskContentComponent {
  @Input() selectedTasklist: Tasklist | null = null;
  @Input({ required: true }) tasks: Task[] = [];
  @Input() isLoading = false;
  
  @Output() createTask = new EventEmitter<{ title: string; description?: string }>();
  @Output() updateTask = new EventEmitter<{ task: Task; data: { title: string; description?: string } }>();
  @Output() toggleComplete = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  showForm = false;
  editingTask: Task | null = null;

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.editingTask = null;
  }

  onToggleComplete(task: Task): void {
    this.toggleComplete.emit(task);
  }

  onEditTask(task: Task): void {
    this.editingTask = task;
    this.showForm = true;
  }

  onDeleteTask(task: Task): void {
    this.deleteTask.emit(task);
  }

  onSaveTask(data: { title: string; description?: string }): void {
    if (this.editingTask) {
      this.updateTask.emit({ task: this.editingTask, data });
    } else {
      this.createTask.emit(data);
    }
    this.onCancelForm();
  }

  onCancelForm(): void {
    this.showForm = false;
    this.editingTask = null;
  }
}