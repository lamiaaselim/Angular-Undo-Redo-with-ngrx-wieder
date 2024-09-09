import { createSelector } from '@ngrx/store';
import * as Root from '../index';
import { UserSate } from './user.state';

export const selectUserFeature = (state: Root.State) => state.user;

export const selectUsername = createSelector(
  selectUserFeature,
  (userState: UserSate) => userState.name
);
