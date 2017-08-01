import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <md-progress-spinner style="height: 48px; width: 48px;" [color]="'primary'" [mode]="'indeterminate'"></md-progress-spinner>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor() { }
}
