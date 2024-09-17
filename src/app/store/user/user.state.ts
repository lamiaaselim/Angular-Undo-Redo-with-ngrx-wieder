import { UndoRedoState, initialUndoRedoState } from 'ngrx-wieder';

export interface UserSate extends UndoRedoState {
  name: string;
}

export const initial: UserSate = {
  name: 'Lamiaa',
  ...initialUndoRedoState
};
