import { NavigationItem } from './api.types';

export const getNavigationItems = (): Promise<NavigationItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          path: 'main-document.docx',
        },
        {
          path: 'files/confidential/file1.pdf',
        },
        {
          path: 'files/confidential/file2.pdf',
        },
        {
          path: 'files/confidential/file3.pdf',
        },
        {
          path: 'files/file2.pdf',
        },
        {
          path: 'files/confidential/agreements/first.docx',
        },
        {
          path: 'files/confidential/agreements/second.docx',
        },
        {
          path: 'files/file1.pdf',
        }
      ])
    }, 500)
  })
};