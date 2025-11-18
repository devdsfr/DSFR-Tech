import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Tasklist } from '../../../../core/models/tasklist.model';

/**
 * TasklistForm Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP: Responsável APENAS por gerenciar o formulário de lista
 * ✅ OCP: Extensível via @Input/@Output
 * ✅ LSP: Substituível por qualquer implementação de formulário
 * ✅ ISP: Recebe apenas editingTasklist (opcional)
 * ✅ DIP: Depende de FormBuilder (abstração do Angular)
 */
@Component({
  selector: 'app-tasklist-form',
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
          <mat-label>Nome da Lista</mat-label>
          <input matInput formControlName="name" placeholder="Ex: Trabalho, Estudos...">
          @if (form.get('name')?.hasError('required')) {
            <mat-error>Nome é obrigatório</mat-error>
          }
          @if (form.get('name')?.hasError('minlength')) {
            <mat-error>Mínimo 3 caracteres</mat-error>
          }
        </mat-form-field>
        <div class="form-actions">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            {{ editingTasklist ? 'Atualizar' : 'Criar' }}
          </button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`
    .form-card {
      margin: 16px;
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
export class TasklistFormComponent implements OnInit {
  @Input() editingTasklist: Tasklist | null = null;
  @Output() save = new EventEmitter<{ name: string }>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.editingTasklist) {
      this.form.patchValue({ name: this.editingTasklist.name });
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