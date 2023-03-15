import React, { useEffect, useState } from 'react';
import { getNavigationItems } from '../../api/api';
import { NavigationItem } from '../../api/api.types';
import { handleOnClick } from '../../helpers/utils';
import FileTreeNode from '../FileTreeNode/FileTreeNode';
import { NavigationState, TreeNode } from './Navigation.types';



function fillTree(path: string[], treeNode: TreeNode) {
  let nextNode: TreeNode;

  const node = path.shift();
  
  if (!node) return;

  const nextKey = `${treeNode.key}/${node}`;

  if (!treeNode.next.has(node)) {
    treeNode.entries.push(node);
    treeNode.next.set(node, new TreeNode(nextKey));
  }
  
  nextNode = treeNode.next.get(node)!;
  fillTree(path, nextNode);
  
  treeNode.entries.sort();
}


const Navigation = () => {
  const state: NavigationState = { treeNode: null, itemCount: -1 };
  const [value, setValue] = useState(state);
  useEffect(() => {
    const rootNode = new TreeNode();

    getNavigationItems().then((items: NavigationItem[]) => {
      if (items.length) {
        items.forEach((item) => {
          const pathArray = item.path.split('/');
          fillTree(pathArray, rootNode);
        });
    
        setValue({ treeNode: rootNode, itemCount: items.length });
      }
    });

  }, []);
  return (value.treeNode && value.itemCount > 0 ? 
    <ul id='fileTreeRoot' className='active'>
      <li>
        <span className='caret' onClick={handleOnClick}>root</span>
        <FileTreeNode treeNode={value.treeNode} />
      </li>
    </ul>
    : <span>No items found</span>);
};


export default Navigation;
