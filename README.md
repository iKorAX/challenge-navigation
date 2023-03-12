# Navigation

### The task

We're building a navigation component that would list folders and files in a tree structure.
The mocked function returns a list a single value that indicates the place where the file should be placed.
Your goal is to create a navigation component that would take this response and render it to the screen.

### Product requirements

The navigation should satisfy the following product requirements:

* There are no strict UI/UX rules. The most important thing to ensure would be the representation of the tree structure. Feel free to use a UI library of your choice.
* The root folder as well as any inner folders can have any number of additional folders or files
* There can be any number of nested folders. There's no hard limit of the amount of folders & files that can be returned
* Items in any level/folder should be sorted alphabetically
* If data doesn't contain any items, the component should display "No items found"

### Technical requirements

* Use the mocked API implementation that is written in `src/api/api.ts`.
* The implementation should have test coverage

### Bonus challenges

For an additional challenge, feel free to do some more coding by implementing the following logic:

* Introduce a global state management tool into the application for better data handling

* The following navigation example is writen in such a way that it would be built for a file tree. Extend the mocked response example with some
text that would be in that file. Implement a text component that would represent the content of a file, turning the application into a very basic IDE.

### Open questions

* Would it be possible to test this solution E2E? What tool would you use and why?
* Imagine that you would need to deploy this component in such a way that it could be reused for different use cases - 
navigation for categories/products, files navigation, settings selector, etc. How would you do it?

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
