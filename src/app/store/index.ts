import {
  Action,
  MetaReducer,
} from "@ngrx/store";
import { TodoSate } from "./todo/todo.state";
import * as fromTodo from "./todo/todo.reducer";
import * as fromUser from "./user/user.reducer";
import { UserSate } from "./user/user.state";

export interface State {
  todo: TodoSate;
  user: UserSate;
}

export const reducers = {
  todo: fromTodo.todoReducer,
  user: fromUser.userReducer,
};

/**
 * Undo/Redo actions
 */
export const undoRedoActions = (reducer: any) => {
  return (state: State | undefined, action: Action): State => {
    const result = reducer(state, action);

    console.log("Action triggered:", action);
    console.log("State after action:", result);

    return result;
  };
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = [undoRedoActions];
