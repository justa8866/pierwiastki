import { Injectable, signal, computed } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({
  providedIn: 'root',
})
export class ElementsStore {
  private _elements = signal<PeriodicElement[]>([]);
  private _filter = signal<string>('');
  private _loading = signal<boolean>(false);

  elements = this._elements.asReadonly();
  filter = this._filter.asReadonly();
  loading = this._loading.asReadonly();

  filteredElements = computed(() => {
    const elements = this._elements();
    const filterValue = this._filter().toLowerCase().trim();

    if (!filterValue) {
      return elements;
    }

    return elements.filter(
      (element) =>
        element.name.toLowerCase().includes(filterValue) ||
        element.symbol.toLowerCase().includes(filterValue) ||
        element.position.toString().includes(filterValue) ||
        element.weight.toString().includes(filterValue)
    );
  });

  loadElements(): void {
    this._loading.set(true);

    setTimeout(() => {
      this._elements.set([...ELEMENT_DATA]);
      this._loading.set(false);
    }, 1000);
  }

  updateElement(updatedElement: PeriodicElement): void {
    this._elements.update((elements) =>
      elements.map((element) =>
        element.position === updatedElement.position
          ? { ...updatedElement }
          : element
      )
    );
  }

  setFilter(filter: string): void {
    this._filter.set(filter);
  }
}
