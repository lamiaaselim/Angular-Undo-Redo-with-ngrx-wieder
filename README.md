# Undo-Redo Todo App with NgRx and ngrx-wieder

This is an Angular application demonstrating a simple to-do list with undo and redo functionality. The application uses `NgRx` for state management, along with `ngrx-wieder` for undo/redo actions.

## Features

- **Todo List**: Add, toggle, and remove todos.
- **Undo/Redo**: Supports undo/redo for list actions (add, toggle, remove).
- **Mood Slider**: Change the mood of the active list, with undo/redo functionality.
- **List Selection**: Switch between different to-do lists.
- **Username Update**: Update username in the store.

## Technologies Used

- **Angular**: Framework for building the frontend application.
- **NgRx**: Reactive state management for Angular applications.
- **ngrx-wieder**: Extension for `NgRx` to implement undo/redo functionality.
- **RxJS**: Reactive programming with observables.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js](https://nodejs.org/).
- You have installed the Angular CLI globally: `npm install -g @angular/cli`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lamiaaselim/Angular-Undo-Redo-with-ngrx-wieder
   ```

2. **Navigate to the project directory**:

   ```bash
   cd undo-redo-todo-app
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Running the Application

To run the application locally:

1. **Start the development server**:

   ```bash
   ng serve
   ```

2. Open your browser and navigate to:

   ```bash
   http://localhost:4200
   ```

The app will automatically reload if you change any of the source files.

## Project Structure

          src/
          ├── app/
          │   ├── store/
          │   │   ├── todo/
          │   │   │   ├── todo.actions.ts   # Todo actions (add, toggle, remove)
          │   │   │   ├── todo.reducer.ts   # Todo reducers
          │   │   │   ├── todo.selector.ts  # Todo selectors
          │   │   └── user/
          │   │       ├── user.action.ts    # User actions (update)
          │   │       ├── user.reducer.ts   # User reducer
          │   │       └── user.selector.ts  # User selectors
          │   ├── app.component.ts          # Main component
          │   ├── app.component.html        # Main component template
          │   └── app.component.scss        # Main component styles

## State Management (NgRx)

This project uses `NgRx` for state management. The state is divided into two main parts:

1. **Todo State**: Manages the to-do lists, including the active list and its todos.
2. **User State**: Manages the username.

The undo/redo functionality is implemented using `ngrx-wieder` to enable time-travel between different states of the application.

### Store Structure

- **todo.actions.ts**: Defines actions like `addTodo`, `toggleTodo`, `removeTodo`, etc.
- **todo.reducer.ts**: Contains the reducer logic for the todos and manages state transitions.
- **todo.selector.ts**: Selectors to get the current list, mood, and todos from the store.
- **user.action.ts**: Defines actions for updating the username.
- **user.reducer.ts**: Handles the username update logic.

## Testing

To run unit tests:

1. **Run the tests**:

   ```bash
   ng test
   ```

This command will run all unit tests using the Karma test runner.

### Test Structure

- **Component Tests**: The `app.component.spec.ts` file contains tests for the component’s functionality.
- **NgRx Store Testing**: Mocks the store to test that the right actions are dispatched and selectors return expected results.

## Undo/Redo with `ngrx-wieder`

This project uses `ngrx-wieder` to implement undo/redo functionality:

- **Undo**: Undo the last action (e.g., adding, toggling, or removing a todo).
- **Redo**: Redo an action that was undone.

Undo/redo actions are handled with `ngrx-wieder`, which automatically tracks state changes in the store and allows time-traveling through the state.
