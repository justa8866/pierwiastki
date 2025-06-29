# Pierwiastki - Chemical Elements Table

Angular 20 application displaying a table of chemical elements with Material Design components and SignalStore for state management.

## Features

- **Interactive Elements Table**: Display chemical elements with columns for Number, Name, Weight, and Symbol
- **Data Loading Simulation**: Loading spinner during app initialization
- **Edit Functionality**: Click any row or edit button to modify element properties via popup dialog
- **Advanced Filtering**: Real-time search across all fields with 2-second debounce
- **Modern UI**: Material Design components with custom styling
- **Responsive Design**: Works on desktop and mobile devices

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Technology Stack

- **Angular 20**: Latest version with standalone components
- **Angular Material**: UI component library for modern design
- **TypeScript**: Strongly typed JavaScript
- **SCSS**: Enhanced CSS with variables and mixins
- **Signal-based State Management**: Modern reactive state management
- **RxJS**: Reactive programming for asynchronous operations

## Project Structure

```text
src/
├── app/
│   ├── components/          # UI components
│   │   ├── elements-table.component.ts    # Main table component
│   │   └── edit-element-dialog.component.ts  # Edit dialog
│   ├── models/              # Data models
│   │   └── periodic-element.model.ts
│   ├── store/               # State management
│   │   └── elements.store.ts
│   └── app.ts              # Root component
└── styles.scss             # Global styles
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## Running tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use:

```bash
npm test
```

## Available Scripts

- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests
- `npm run serve:ssr:pierwiastki` - Serve SSR build

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
