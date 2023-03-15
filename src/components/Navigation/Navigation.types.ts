import { NavigationItem } from '../../api/api.types';

export interface NavigationProps {
  data: NavigationItem[];
}

export class TreeNode {
  // could add a data property here if we were to transform this into an IDE
  public key: string;
  public entries: Array<string>;
  public next: Map<string, TreeNode>;

  constructor(key: string = '') {
    this.key = key;
    this.entries = [];
    this.next = new Map<string, TreeNode>();
  }
}
export interface NavigationState {
  treeNode: TreeNode | null;
  itemCount: number;
}
