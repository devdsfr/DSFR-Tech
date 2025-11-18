import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { TasklistService } from '../../core/services/tasklist.service';
import { TaskService } from '../../core/services/task.service';
import { Tasklist } from '../../core/models/tasklist.model';
import { Task } from '../../core/models/task.model';
import { TasklistSidebarComponent } from './components/tasklist-sidebar/tasklist-sidebar.component';
import { TaskContentComponent } from './components/task-content/task-content.component';

/**
 * Dashboard Component - Orquestrador Principal
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por orquestrar a comunicação entre componentes
 *         e gerenciar chamadas aos serviços
 * ✅ OCP: Extensível via composição de componentes filhos
 * ✅ LSP: Componentes filhos são substituíveis
 * ✅ ISP: Cada componente filho recebe apenas dados necessários
 * ✅ DIP: Depende de abstrações (serviços injetados, componentes modulares)
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    TasklistSidebarComponent,
    TaskContentComponent
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary">
        <mat-icon>checklist</mat-icon>
        <span style="margin-left: 10px;">JTech TaskList</span>
        <span class="spacer"></span>
        <span style="margin-right: 16px;">{{ currentUser()?.name }}</span>
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <div class="main-content">
        <app-tasklist-sidebar
          [tasklists]="tasklists()"
          [selectedTasklistId]="selectedTasklist()?.id || null"
          [isLoading]="isLoadingTasklists()"
          (selectTasklist)="onSelectTasklist($event)"
          (createTasklist)="onCreateTasklist($event)"
          (updateTasklist)="onUpdateTasklist($event)"
          (deleteTasklist)="onDeleteTasklist($event)">
        </app-tasklist-sidebar>

        <app-task-content
          [selectedTasklist]="selectedTasklist()"
          [tasks]="tasks()"
          [isLoading]="isLoadingTasks()"
          (createTask)="onCreateTask($event)"
          (updateTask)="onUpdateTask($event)"
          (toggleComplete)="onToggleTaskComplete($event)"
          (deleteTask)="onDeleteTask($event)">
        </app-task-content>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { 
      display: flex; 
      flex-direction: column; 
      height: 100vh; 
      background: #f5f5f5; 
    }
    .spacer { 
      flex: 1; 
    }
    .main-content { 
      display: flex; 
      flex: 1; 
      overflow: hidden; 
    }
  `]
})
export class DashboardComponent implements OnInit {
  tasklists = signal<Tasklist[]>([]);
  selectedTasklist = signal<Tasklist | null>(null);
  isLoadingTasklists = signal(false);
  tasks = signal<Task[]>([]);
  isLoadingTasks = signal(false);
  currentUser = signal<any>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasklistService: TasklistService,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasklists();
    const user = this.authService.currentUser();
    this.currentUser.set(user);
  }

  // ========== TASKLIST OPERATIONS ==========
  loadTasklists(): void {
    this.isLoadingTasklists.set(true);
    this.tasklistService.getAll().subscribe({
      next: (tasklists: Tasklist[]) => {
        this.tasklists.set(tasklists);
        this.isLoadingTasklists.set(false);
        if (tasklists.length > 0 && !this.selectedTasklist()) {
          this.onSelectTasklist(tasklists[0]);
        }
      },
      error: (error: any) => {
        this.isLoadingTasklists.set(false);
        this.showError('Erro ao carregar listas');
      }
    });
  }

  onSelectTasklist(tasklist: Tasklist): void {
    this.selectedTasklist.set(tasklist);
    this.loadTasks(tasklist.id);
  }

  onCreateTasklist(data: { name: string }): void {
    this.tasklistService.create(data).subscribe({
      next: (tasklist: Tasklist) => {
        this.tasklists.update((lists: Tasklist[]) => [...lists, tasklist]);
        this.onSelectTasklist(tasklist);
        this.showSuccess('Lista criada!');
      },
      error: (error: any) => this.showError('Erro ao criar lista')
    });
  }

  onUpdateTasklist(event: { tasklist: Tasklist; name: string }): void {
    this.tasklistService.update(event.tasklist.id, { name: event.name }).subscribe({
      next: (updated: Tasklist) => {
        this.tasklists.update((lists: Tasklist[]) => 
          lists.map((l: Tasklist) => l.id === updated.id ? updated : l)
        );
        if (this.selectedTasklist()?.id === updated.id) {
          this.selectedTasklist.set(updated);
        }
        this.showSuccess('Lista atualizada!');
      },
      error: (error: any) => this.showError('Erro ao atualizar lista')
    });
  }

  onDeleteTasklist(tasklist: Tasklist): void {
    if (confirm(`Excluir "${tasklist.name}"?`)) {
      this.tasklistService.delete(tasklist.id).subscribe({
        next: () => {
          this.tasklists.update((lists: Tasklist[]) => 
            lists.filter((l: Tasklist) => l.id !== tasklist.id)
          );
          if (this.selectedTasklist()?.id === tasklist.id) {
            const remaining = this.tasklists();
            this.selectedTasklist.set(remaining[0] || null);
            if (remaining[0]) {
              this.loadTasks(remaining[0].id);
            } else {
              this.tasks.set([]);
            }
          }
          this.showSuccess('Lista excluída!');
        },
        error: (error: any) => this.showError('Erro ao excluir lista')
      });
    }
  }

  // ========== TASK OPERATIONS ==========
  loadTasks(tasklistId: string): void {
    this.isLoadingTasks.set(true);
    this.taskService.getByTasklist(tasklistId).subscribe({
      next: (tasks: Task[]) => {
        this.tasks.set(tasks);
        this.isLoadingTasks.set(false);
      },
      error: (error: any) => {
        this.isLoadingTasks.set(false);
        this.showError('Erro ao carregar tarefas');
      }
    });
  }

  onCreateTask(data: { title: string; description?: string }): void {
    const tasklist = this.selectedTasklist();
    if (!tasklist) return;
    
    console.log('🔍 Creating task with tasklistId:', tasklist.id);
    console.log('🔍 Current user:', this.currentUser());
    
    this.taskService.create({ ...data, tasklistId: tasklist.id }).subscribe({
      next: (task: Task) => {
        this.tasks.update((tasks: Task[]) => [...tasks, task]);
        this.showSuccess('Tarefa criada!');
      },
      error: (error: any) => this.showError('Erro ao criar tarefa')
    });
  }

  onUpdateTask(event: { task: Task; data: { title: string; description?: string } }): void {
    this.taskService.update(event.task.id, { 
      ...event.data, 
      completed: event.task.completed 
    }).subscribe({
      next: (updated: Task) => {
        this.tasks.update((tasks: Task[]) => 
          tasks.map((t: Task) => t.id === updated.id ? updated : t)
        );
        this.showSuccess('Tarefa atualizada!');
      },
      error: (error: any) => this.showError('Erro ao atualizar tarefa')
    });
  }

  onToggleTaskComplete(task: Task): void {
    this.taskService.update(task.id, { completed: !task.completed }).subscribe({
      next: (updated: Task) => {
        this.tasks.update((tasks: Task[]) => 
          tasks.map((t: Task) => t.id === updated.id ? updated : t)
        );
      },
      error: (error: any) => this.showError('Erro ao atualizar tarefa')
    });
  }

  onDeleteTask(task: Task): void {
    if (confirm(`Excluir "${task.title}"?`)) {
      this.taskService.delete(task.id).subscribe({
        next: () => {
          this.tasks.update((tasks: Task[]) => 
            tasks.filter((t: Task) => t.id !== task.id)
          );
          this.showSuccess('Tarefa excluída!');
        },
        error: (error: any) => this.showError('Erro ao excluir tarefa')
      });
    }
  }

  // ========== UTILITY METHODS ==========
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', { 
      duration: 3000, 
      panelClass: ['success-snackbar'] 
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', { 
      duration: 5000, 
      panelClass: ['error-snackbar'] 
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}