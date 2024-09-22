import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeNode } from '@app/pages/page-demo/form/base/tree/tree-type';
import { TreeComponent } from '@app/pages/page-demo/form/base/tree/tree.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { ChangNumberToChinesePipe } from '@shared/pipes/chang-number-to-chinese.pipe';
import { fnCheckForm } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ob, mp } from './test/test';
import { testComponent } from '../test/test.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    WaterMarkComponent,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzRadioModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule,
    TreeComponent,
    ChangNumberToChinesePipe,
    testComponent
  ]
})
export class BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('dragTpl', { static: true }) dragTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('baseForm', { static: true }) baseForm!: FormGroup;
  @ViewChild(TreeComponent) treeComponentRef: TreeComponent | undefined;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '基础表单',
    desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '表单页', '基础表单']
  };
  listOfOption = [
    { label: '同事甲', value: '同事甲' },
    { label: '同事乙', value: '同事乙' },
    { label: '同事丙', value: '同事丙' }
  ];

  treeData: TreeNode[] = [
    {
      id: '1',
      name: '家用电器',
      children: [
        {
          id: '4',
          name: '大家电4',
          children: [
            {
              id: '8',
              name: '大家电9',
              children: [] // 可以继续添加子节点
            }
          ] // 可以继续添加子节点
        }
      ]
    },
    {
      id: '2',
      name: '家用电2',
      children: [
        {
          id: '5',
          name: '大家电5',
          children: [] // 可以继续添加子节点
        }
      ]
    },
    {
      id: '3',
      name: '家用电器3',
      children: [
        {
          id: '6',
          name: '大家电6',
          children: [] // 可以继续添加子节点
        }
      ]
    },
    {
      id: '4',
      name: '家用电器4',
      children: [
        {
          id: '7',
          name: '大家电7',
          children: [] // 可以继续添加子节点
        }
      ]
    }
  ];
  destroyRef = inject(DestroyRef);

  validateForm!: FormGroup;

  submitForm(): void {
    if (!fnCheckForm(this.validateForm)) {
      return;
    }
  }
  private fb = inject(FormBuilder);

  initForm(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null],
      invitedCommenter: [null],
      weights: [null],
      isPublic: [null]
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.handleTreeData(this.treeData);
    console.log(this.treeData);
  }

  handleTreeData(tree: TreeNode[]): void {
    if (tree && tree.length) {
      for (let item of tree) {
        item.show = true;
        item.check = false;
        if (item.children) {
          this.handleTreeData(item.children);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    // 无论是模版式表单还是响应式表单，都可以通过这种方式来监听表单数据都变化
    this.baseForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      console.log(res);
    });
    console.log(this.treeComponentRef);
    ob.subscribe({
      next: val => console.log(val),
      complete: () => console.log('complete')
    });
    mp.subscribe({
      next: val => console.log(val),
      error: err => console.log(err)
    });
  }

  handleElevateEle(arg: any): void {
    console.log(arg, 'topEle');
  }
}
