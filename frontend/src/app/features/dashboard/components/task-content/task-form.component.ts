import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../../core/models/task.model';

/**
 * TaskForm Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por gerenciar o formulário de tarefa
 * ✅ OCP: Extensível via @Input/@Output
 * ✅ LSP: Substituível por qualquer implementação de formulário
 * ✅ ISP: Recebe apenas editingTask (opcional)
 * ✅ DIP: Depende de FormBuilder (abstração)
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card class="form-card">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field class="full-width">
          <mat-label>Título</mat-label>
          <input matInput formControlName="title" placeholder="O que precisa ser feito?">
          @if (form.get('title')?.hasError('required')) {
            <mat-error>Título é obrigatório</mat-error>
          }
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Descrição (opcional)</mat-label>
          <textarea matInput formControlName="description" rows="3" placeholder="Detalhes adicionais..."></textarea>
        </mat-form-field>
        <div class="form-actions">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            {{ editingTask ? 'Atualizar' : 'Criar' }}
          </button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`
    .form-card {
      margin-bottom: 24px;
      padding: 16px;
    }
    .full-width {
      width: 100%;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }
  `]
})
export class TaskFormComponent implements OnInit {
  @Input() editingTask: Task | null = null;
  @Output() save = new EventEmitter<{ title: string; description?: string }>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit(): void {
    if (this.editingTask) {
      this.form.patchValue({
        title: this.editingTask.title,
        description: this.editingTask.description
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.form.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.form.reset();
  }
}