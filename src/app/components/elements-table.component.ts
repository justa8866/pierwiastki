import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ElementsStore } from '../store/elements.store';
import { PeriodicElement } from '../models/periodic-element.model';
import { EditElementDialogComponent } from './edit-element-dialog.component';

@Component({
  selector: 'app-elements-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  template: `
    <mat-card class="container">
      <mat-card-header>
        <mat-card-title>Chemical Elements Table</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Filter elements</mat-label>
          <input
            matInput
            [(ngModel)]="filterValue"
            placeholder="Enter name, symbol, number or weight..."
            (input)="onFilterChange($event)"
          />
          <svg
            matSuffix
            class="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </mat-form-field>

        <div *ngIf="store.loading()" class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading data...</p>
        </div>

        <div *ngIf="!store.loading()" class="table-container">
          <table
            mat-table
            [dataSource]="store.filteredElements()"
            class="elements-table"
          >

            <ng-container matColumnDef="position">
              <th mat-header-cell *matHeaderCellDef>Number</th>
              <td mat-cell *matCellDef="let element">{{ element.position }}</td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let element">{{ element.name }}</td>
            </ng-container>

            <ng-container matColumnDef="weight">
              <th mat-header-cell *matHeaderCellDef>Weight</th>
              <td mat-cell *matCellDef="let element">{{ element.weight }}</td>
            </ng-container>

            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef>Symbol</th>
              <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let element">
                <button
                  mat-icon-button
                  color="primary"
                  class="action-button"
                  disableRipple
                  (click)="editElement(element); $event.stopPropagation()"
                  matTooltip="Edit element"
                >
                  <svg
                    class="edit-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              class="element-row"
              (click)="editElement(row)"
            ></tr>
          </table>

          <div *ngIf="store.filteredElements().length === 0" class="no-data">
            <p>No data to display</p>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .container {
        margin: 20px auto;
        max-width: 1200px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: 12px;
        overflow: hidden;
      }

      .filter-field {
        width: 100%;
        margin-bottom: 24px;
      }

      .filter-field .mat-mdc-form-field-icon-suffix {
        color: rgba(0, 0, 0, 0.54);
      }

      .search-icon {
        width: 20px;
        height: 20px;
        color: #666;
        stroke-width: 2;
        cursor: pointer;
        margin-right: 8px;
        margin-left: 4px;
      }

      .search-icon:hover {
        color: #3f51b5;
      }

      .filter-field .mat-mdc-form-field-icon-suffix {
        padding-left: 8px;
        padding-right: 12px;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 40px;
      }

      .loading-container p {
        margin-top: 16px;
        color: #666;
        font-size: 14px;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
        border-radius: 8px;
      }

      .elements-table {
        width: 100%;
        background: white;
      }

      .element-row {
        cursor: pointer;
        transition: all 0.2s ease;
        height: 56px;
      }

      .element-row:hover {
        background-color: rgba(63, 81, 181, 0.04);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .no-data {
        text-align: center;
        padding: 60px 40px;
        color: #666;
        font-size: 16px;
        background: #fafafa;
        border-radius: 8px;
        margin: 20px 0;
      }

      mat-header-cell {
        font-weight: 600;
        color: #37474f;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      mat-cell {
        font-size: 14px;
        color: #424242;
        padding: 12px;
      }

      .action-button {
        width: 32px !important;
        height: 32px !important;
        min-width: 32px !important;
        min-height: 32px !important;
        line-height: 32px !important;
        border-radius: 50% !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        margin: 0 !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .action-button:hover {
        transform: scale(1.1);
        background-color: rgba(63, 81, 181, 0.1) !important;
      }

      .action-button:focus {
        outline: none !important;
        box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2) !important;
      }

      .edit-icon {
        width: 16px !important;
        height: 16px !important;
        stroke-width: 2;
        color: currentColor;
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .action-button:hover .edit-icon {
        stroke-width: 2.5;
      }

      .action-button .mat-mdc-button-touch-target {
        display: none !important;
      }

      .action-button .mdc-button__ripple {
        display: none !important;
      }

      .action-button .mat-mdc-focus-indicator {
        display: none !important;
      }

      .mat-column-actions {
        width: 60px;
        text-align: center;
        padding: 0 !important;
      }

      .mat-column-actions mat-cell {
        padding: 4px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      mat-card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 24px;
        margin-bottom: 0;
      }

      mat-card-title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        letter-spacing: 0.5px;
      }

      mat-card-content {
        padding: 24px;
        background: #fafafa;
      }

      @media (max-width: 768px) {
        .container {
          margin: 10px;
          border-radius: 8px;
        }

        mat-card-content {
          padding: 16px;
        }

        .filter-field {
          margin-bottom: 16px;
        }

        .elements-table {
          font-size: 12px;
        }

        mat-cell,
        mat-header-cell {
          padding: 8px 4px;
        }
      }

      .filter-field .mdc-text-field--outlined .mdc-notched-outline {
        border-color: rgba(0, 0, 0, 0.12);
      }

      .filter-field .mdc-text-field--focused .mdc-notched-outline {
        border-color: #3f51b5;
        border-width: 2px;
      }

      .mat-mdc-row:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      .loading-container mat-spinner {
        --mdc-circular-progress-active-indicator-color: #3f51b5;
      }
    `,
  ],
})
export class ElementsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  filterValue = '';
  private filterTimeout: any;

  constructor(public store: ElementsStore, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.loadElements();
  }

  onFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterValue = target.value;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.store.setFilter(this.filterValue);
    }, 2000);
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '400px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.updateElement(result);
      }
    });
  }
}
