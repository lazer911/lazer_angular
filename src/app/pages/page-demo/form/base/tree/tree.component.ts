import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { TreeNodeComponent } from './tree-node/tree-node.component';
import { TreeNode } from './tree-type';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less'],
  standalone: true,
  imports: [TreeNodeComponent]
})
export class TreeComponent implements OnInit {
  @Input() TreeData!: TreeNode[];
  @Output() readonly elevateNode: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    console.log('this is the tree');
  }
  onElevateNode(arg: any): void {
    this.elevateNode.emit(arg);
  }
}
