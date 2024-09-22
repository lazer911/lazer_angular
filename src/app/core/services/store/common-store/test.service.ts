import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { dataCast } from '../types/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testData$ = new BehaviorSubject<dataCast>({
    data: 'test'
  });

  // 设置当前loading对象
  setTestData(payload: dataCast): void {
    this.testData$.next(payload);
  }

  getTestData(): Observable<dataCast> {
    return this.testData$.asObservable();
  }
}
