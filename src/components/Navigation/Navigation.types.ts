import { NavigationItem } from '../../api/api.types';

export interface NavigationProps {
  data: NavigationItem[];
}

export class TreeNode {
  public key: string;
  // public keys: Set<string>;
  public entries: Array<string>;
  public next: Map<string, TreeNode>;

  constructor(key: string = '') {
    this.key = key;
    // this.keys = new Set();
    this.entries = [];
    this.next = new Map<string, TreeNode>();
  }
}
export interface NavigationState {
  treeNode: TreeNode | null;
  itemCount: number;
}
