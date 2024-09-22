import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TestService } from '@app/core/services/store/common-store/test.service';

@Component({
  selector: 'app-two',
  standalone: true,
  template: `
    <button (click)="resetFn()">reSetData</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class twoComponent {
  private testService$ = inject(TestService);
  resetFn(): void {
    this.testService$.setTestData({
      data: 'two'
    });
  }
}
