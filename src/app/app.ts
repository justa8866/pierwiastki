import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementsTableComponent } from './components/elements-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ElementsTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'chemical-elements';
}
