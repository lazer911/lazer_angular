import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'base-form', pathMatch: 'full' },
  { path: 'base-form', title: '基础表单', data: { key: 'base-form' }, loadComponent: () => import('./base/base.component').then(m => m.BaseComponent) },
  { path: 'step-form', title: '分步表单', data: { key: 'step-form' }, loadComponent: () => import('./step/step.component').then(m => m.StepComponent) },
  { path: 'test-comp', title: '测试组件', data: { key: 'test-comp' }, loadComponent: () => import('./test/test.component').then(m => m.testComponent) },
  { path: 'advanced-form', title: '高级表单', data: { key: 'advanced-form' }, loadComponent: () => import('./advanced/advanced.component').then(m => m.AdvancedComponent) }
] as Route[];
