import { produceOn, undoRedo } from 'ngrx-wieder';
import * as User from './user.state';
import { updateUser } from './user.action';

const { createUndoRedoReducer } = undoRedo({
  allowedActionTypes: [updateUser.type]
});

export const userReducer = createUndoRedoReducer(
  User.initial,
  produceOn(updateUser, (state, { name }) => {
    state.name = name;
  })
);
