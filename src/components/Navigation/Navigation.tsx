import React, { useEffect, useState } from 'react';
import { getNavigationItems } from '../../api/api';
import { NavigationItem } from '../../api/api.types';
import { fillTree, handleOnClick } from '../../helpers/utils';
import FileTreeNode from '../FileTreeNode/FileTreeNode';
import { NavigationState, TreeNode } from './Navigation.types';

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
    <ul id='fileTreeRoot' data-testid='fileTreeRoot' className='active'>
      <li>
        <span className='caret' onClick={handleOnClick}>root</span>
        <FileTreeNode treeNode={value.treeNode} />
      </li>
    </ul>
    : <span data-testid='noItemsFound'>No items found</span>);
};


export default Navigation;
