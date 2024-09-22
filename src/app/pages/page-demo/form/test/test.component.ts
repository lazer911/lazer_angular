import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TestService } from '@app/core/services/store/common-store/test.service';

import { oneComponent } from './one/one.component';
import { twoComponent } from './two/two.component';

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [oneComponent, twoComponent]
})
export class testComponent {
  private testService$ = inject(TestService);
  destroyRef = inject(DestroyRef);
  myData: any = null;
  storeData: any = this.testService$
    .getTestData()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      this.myData = res;
    });
}
