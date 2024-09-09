import { createSelector } from '@ngrx/store';
import { createHistorySelectors } from 'ngrx-wieder';
import * as Todo from './todo.state';
import * as Root from '../index';

export const selectTodoFeature = (state: Root.State) => state.todo;

export const getActiveList = (state: Todo.TodoSate): Todo.TodoList =>
  state.lists[state.activeList];

export const selectActiveList = createSelector(
  selectTodoFeature,
  getActiveList
);

export const { selectCanUndo, selectCanRedo } = createHistorySelectors<
  Root.State,
  Todo.TodoSate
>(selectTodoFeature, state => state.activeList);
