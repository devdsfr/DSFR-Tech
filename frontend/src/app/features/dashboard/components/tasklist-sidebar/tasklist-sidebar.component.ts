import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Tasklist } from '../../../../core/models/tasklist.model';
import { TasklistItemComponent } from './tasklist-item.component';
import { TasklistFormComponent } from './tasklist-form.component';

/**
 * TasklistSidebar Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por orquestrar a sidebar de listas
 * ✅ OCP: Extensível via composição de componentes filhos
 * ✅ LSP: Componentes filhos são substituíveis
 * ✅ ISP: Cada componente filho recebe apenas o necessário
 * ✅ DIP: Depende de abstrações (TasklistItemComponent, TasklistFormComponent)
 */
@Component({
  selector: 'app-tasklist-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TasklistItemComponent,
    TasklistFormComponent
  ],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Minhas Listas</h2>
        <button mat-icon-button color="primary" (click)="toggleForm()">
          <mat-icon>add</mat-icon>
        </button>
      </div>

      @if (showForm()) {
        <app-tasklist-form
          [editingTasklist]="editingTasklist()"
          (save)="onSave($event)"
          (cancel)="onCancelForm()">
        </app-tasklist-form>
      }

      @if (isLoading) {
        <div class="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {
        <mat-nav-list>
          @for (tasklist of tasklists; track tasklist.id) {
            <app-tasklist-item
              [tasklist]="tasklist"
              [isSelected]="tasklist.id === selectedTasklistId"
              (select)="onSelectTasklist($event)"
              (edit)="onEditTasklist($event)"
              (delete)="onDeleteTasklist($event)">
            </app-tasklist-item>
          } @empty {
            <div class="empty-state">
              <mat-icon>inbox</mat-icon>
              <p>Nenhuma lista criada</p>
              <button mat-raised-button color="primary" (click)="toggleForm()">
                Criar primeira lista
              </button>
            </div>
          }
        </mat-nav-list>
      }
    </div>
  `,
  styles: [`
    .sidebar {
      width: 300px;
      background: white;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    .sidebar-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }
    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
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
export class TasklistSidebarComponent {
  @Input({ required: true }) tasklists: Tasklist[] = [];
  @Input() selectedTasklistId: string | null = null;
  @Input() isLoading = false;
  
  @Output() selectTasklist = new EventEmitter<Tasklist>();
  @Output() createTasklist = new EventEmitter<{ name: string }>();
  @Output() updateTasklist = new EventEmitter<{ tasklist: Tasklist; name: string }>();
  @Output() deleteTasklist = new EventEmitter<Tasklist>();

  showForm = signal(false);
  editingTasklist = signal<Tasklist | null>(null);

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    this.editingTasklist.set(null);
  }

  onSelectTasklist(tasklist: Tasklist): void {
    this.selectTasklist.emit(tasklist);
  }

  onEditTasklist(tasklist: Tasklist): void {
    this.editingTasklist.set(tasklist);
    this.showForm.set(true);
  }

  onDeleteTasklist(tasklist: Tasklist): void {
    this.deleteTasklist.emit(tasklist);
  }

  onSave(data: { name: string }): void {
    const editing = this.editingTasklist();
    if (editing) {
      this.updateTasklist.emit({ tasklist: editing, name: data.name });
    } else {
      this.createTasklist.emit(data);
    }
    this.onCancelForm();
  }

  onCancelForm(): void {
    this.showForm.set(false);
    this.editingTasklist.set(null);
  }
}