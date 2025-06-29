import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicElement } from '../models/periodic-element.model';

@Component({
  selector: 'app-edit-element-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Edit element</h2>
    <mat-dialog-content>
      <form class="edit-form">
        <mat-form-field appearance="outline">
          <mat-label>Number</mat-label>
          <input
            matInput
            type="number"
            [(ngModel)]="element.position"
            name="position"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="element.name" name="name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Weight</mat-label>
          <input
            matInput
            type="number"
            step="0.0001"
            [(ngModel)]="element.weight"
            name="weight"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Symbol</mat-label>
          <input matInput [(ngModel)]="element.symbol" name="symbol" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .edit-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 350px;
        padding: 8px 0;
      }

      mat-form-field {
        width: 100%;
      }

      h2[mat-dialog-title] {
        margin: 0 0 16px 0;
        color: #37474f;
        font-weight: 500;
        font-size: 20px;
      }

      mat-dialog-content {
        padding: 0 24px 20px 24px;
        overflow: visible;
      }

      mat-dialog-actions {
        padding: 8px 24px 16px 24px;
        gap: 12px;
      }

      button[mat-button] {
        min-width: 80px;
        height: 40px;
        border-radius: 20px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      button[mat-raised-button] {
        min-width: 80px;
        height: 40px;
        border-radius: 20px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      button[mat-raised-button]:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-1px);
      }

      .mdc-text-field--outlined .mdc-notched-outline {
        border-color: rgba(0, 0, 0, 0.12);
      }

      .mdc-text-field--focused .mdc-notched-outline {
        border-color: #3f51b5;
        border-width: 2px;
      }

      .mdc-text-field--outlined .mdc-floating-label {
        color: rgba(0, 0, 0, 0.6);
      }

      .mdc-text-field--focused .mdc-floating-label {
        color: #3f51b5;
      }
    `,
  ],
})
export class EditElementDialogComponent {
  element: PeriodicElement;

  constructor(
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {
    this.element = { ...data };
  }

  onSave(): void {
    this.dialogRef.close(this.element);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
