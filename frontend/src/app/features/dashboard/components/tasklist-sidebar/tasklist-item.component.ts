import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Tasklist } from '../../../../core/models/tasklist.model';

/**
 * TasklistItem Component
 * 
 * SOLID Principles Applied:
 * 
 * ✅ SRP (Single Responsibility): 
 *    - Responsável APENAS por exibir um item de lista
 *    - Não gerencia estado, não faz chamadas HTTP
 * 
 * ✅ OCP (Open/Closed):
 *    - Aberto para extensão via @Input/@Output
 *    - Fechado para modificação - não precisa mudar para adicionar funcionalidades
 * 
 * ✅ LSP (Liskov Substitution):
 *    - Pode ser substituído por qualquer componente que implemente a mesma interface
 * 
 * ✅ ISP (Interface Segregation):
 *    - Recebe apenas os dados necessários (tasklist, isSelected)
 *    - Não recebe objetos grandes desnecessários
 * 
 * ✅ DIP (Dependency Inversion):
 *    - Não depende de implementações concretas
 *    - Comunica via eventos (@Output) - abstração
 */
@Component({
  selector: 'app-tasklist-item',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  template: `
    <mat-list-item 
      [class.selected]="isSelected"
      (click)="onSelect()">
      <mat-icon matListItemIcon>list</mat-icon>
      <span matListItemTitle>{{ tasklist.name }}</span>
      <button 
        mat-icon-button 
        matListItemMeta 
        [matMenuTriggerFor]="menu" 
        (click)="$event.stopPropagation()">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="onEdit()">
          <mat-icon>edit</mat-icon>
          <span>Editar</span>
        </button>
        <button mat-menu-item (click)="onDelete()">
          <mat-icon color="warn">delete</mat-icon>
          <span>Excluir</span>
        </button>
      </mat-menu>
    </mat-list-item>
  `,
  styles: [`
    mat-list-item {
      cursor: pointer;
      transition: background 0.2s;
    }
    mat-list-item:hover {
      background: #f5f5f5;
    }
    mat-list-item.selected {
      background: #e3f2fd;
    }
  `]
})
export class TasklistItemComponent {
  @Input({ required: true }) tasklist!: Tasklist;
  @Input() isSelected = false;
  
  @Output() select = new EventEmitter<Tasklist>();
  @Output() edit = new EventEmitter<Tasklist>();
  @Output() delete = new EventEmitter<Tasklist>();

  onSelect(): void {
    this.select.emit(this.tasklist);
  }

  onEdit(): void {
    this.edit.emit(this.tasklist);
  }

  onDelete(): void {
    this.delete.emit(this.tasklist);
  }
}