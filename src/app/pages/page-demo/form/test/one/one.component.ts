import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TestService } from '@app/core/services/store/common-store/test.service';

@Component({
  selector: 'app-one',
  standalone: true,
  template: `
    <button (click)="changeStoreData()">changeData</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class oneComponent {
  private testService$ = inject(TestService);
  changeStoreData(): void {
    this.testService$.setTestData({
      data: 'sdasdasddasdasda'
    });
  }
}
