import React from 'react';
import { TreeNode } from '../components/Navigation/Navigation.types';
import { fillTree } from './utils';
import structuredClone from '@ungap/structured-clone';

// probably should either find a way to test the click handler or make it private to the components and test the results of its work there
describe('utils', () => {
  describe('fillTree', () => {
    describe('if path is empty', () => {
      it('does not change the tree', () => {
        const file2Node = new TreeNode('/folder/file2');

        const folderNode = new TreeNode('/folder');
        folderNode.entries = ['file2'];
        folderNode.next.set('file2', file2Node);

        const existingTree = new TreeNode();
        existingTree.entries = ['folder'];
        existingTree.next.set('folder', folderNode);

        const expectedTree = structuredClone(existingTree);

        fillTree([], existingTree);

        expect(existingTree).toEqual(expectedTree);
      });
    });

    // could probably also test sorting on different levels and the contents of public TreeNode properties
    describe('if path is not empty', () => {
      it('creates a node out of the input path and adds it to the tree of nodes', () => {
        const input = ['folder', 'nestedFolder', 'file1'];

        const file2Node = new TreeNode('/folder/nestedFolder/file2');
        const nestedFolderNode = new TreeNode('/folder/nestedFolder');
        nestedFolderNode.entries = ['file2'];
        nestedFolderNode.next.set('file2', file2Node);

        const folderNode = new TreeNode('/folder');
        folderNode.entries = ['nestedFolder'];
        folderNode.next.set('nestedFolder', nestedFolderNode);

        const existingTree = new TreeNode();
        existingTree.entries = ['folder'];
        existingTree.next.set('folder', folderNode);

        fillTree(input, existingTree);

        expect(nestedFolderNode.entries).toEqual(['file1', 'file2']); // sorted alphabetically
        expect(nestedFolderNode.next.get('file1')?.key).toEqual('/folder/nestedFolder/file1');
      });
    });
  });
});