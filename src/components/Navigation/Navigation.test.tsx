import { render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { getNavigationItems } from '../../api/api';
import { NavigationItem } from '../../api/api.types';
import Navigation from './Navigation';

jest.mock('../../api/api', () => ({
  getNavigationItems: jest.fn(),
}));

// also needs to include click event tests to check that the handler gets called
describe('Navigation tests', () => {
  describe('if input is not an empty array', () => {
    const inputs: NavigationItem[] = [
      {
        path: 'main-document.docx',
      },
      {
        path: 'files/confidential/file1.pdf',
      },
      {
        path: 'files/confidential/file2.pdf',
      },
    ];
    beforeEach(() => {
      (getNavigationItems as jest.Mock).mockImplementation(async () => inputs);
    });

    it('renders a recursive tree', async () => {
      render(<Navigation />);
  
      const rootElement = await waitFor(() => screen.findByTestId('fileTreeRoot'), { timeout: 2000 });
      const mainDocumentElement = within(rootElement).getByTestId('/main-document.docx');
      const filesElement = within(rootElement).getByTestId('/files');
      const confidentialElement = within(filesElement).getByTestId('/files/confidential');
  
      expect(rootElement).toHaveTextContent('root');
      expect(filesElement).toHaveTextContent('files');
      expect(mainDocumentElement).toHaveTextContent('main-document.docx');
      expect(confidentialElement).toHaveTextContent('confidential');
    });
  
    const testIds = [['/main-document.docx'], ['/files'], ['/files/confidential'], ['/files/confidential/file1.pdf'], ['/files/confidential/file2.pdf']];
    it.each(testIds)('only renders each file tree node once', async (input) => {
      render(<Navigation />);
  
      const rootElement = await waitFor(() => screen.findByTestId('fileTreeRoot'), { timeout: 2000 });
      await expect(within(rootElement).findAllByTestId(input)).resolves.toHaveLength(1);
    });
  });

  describe('if input is an empty array', () => {
    beforeEach(() => {
      (getNavigationItems as jest.Mock).mockResolvedValue([]);
    })

    it('renders a no items found message', async () => {
      render(<Navigation />);

      const rootElement = screen.queryByTestId('fileTreeRoot');
      const noItemsFoundElement = await waitFor(() => screen.findByTestId('noItemsFound'), { timeout: 2000 });

      expect(rootElement).not.toBeInTheDocument();
      expect(noItemsFoundElement).toHaveTextContent('No items found');
    });
  });
});
