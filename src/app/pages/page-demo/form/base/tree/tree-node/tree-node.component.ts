import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { TreeNode } from '../tree-type';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.less'],
  standalone: true,
  imports: [NzIconModule, NzCheckboxModule, FormsModule]
})
export class TreeNodeComponent {
  @Input() node: TreeNode | undefined;
  @Output() readonly toggleNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  onToggleNode(item: any): void {
    item.show = !item.show;
    console.log(item, 'base');
    this.toggleNode.emit(item);
  }
}
