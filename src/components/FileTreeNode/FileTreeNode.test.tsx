import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { TreeNode } from '../Navigation/Navigation.types';
import FileTreeNode from './FileTreeNode';

describe('Navigation tests', () => {
  it('renders a recursive tree', async () => {
    const rootNode = new TreeNode();
    rootNode.entries = ['folder1'];
    
    const folder1Node = new TreeNode();
    folder1Node.entries = ['file1'];
    folder1Node.key = 'folder1';
    folder1Node.next.set('file1', new TreeNode('folder1/file1'));

    rootNode.next.set('folder1', folder1Node);


    render(<FileTreeNode treeNode={rootNode}/>);

    const folder1Element = await waitFor(() => screen.findByTestId('folder1'), { timeout: 3000 });
    const folder1file1Element = within(folder1Element).getByTestId('folder1/file1');

    expect(folder1file1Element).toHaveTextContent('file1');
    expect(folder1Element).toHaveTextContent('folder1');
  });
});
