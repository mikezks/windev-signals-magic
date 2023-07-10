import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Angular Signals Magic</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Signals - The new reactive primitive.</li>
          <li>Demo to explain internal implementation.</li>
          <li>See ReactiveNodes in the DevTools Console.</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {

}
