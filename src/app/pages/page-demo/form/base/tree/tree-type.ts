export interface TreeNode {
  id: number | string;
  name: string;
  show?: boolean;
  check?: boolean;
  children?: TreeNode[];
}
