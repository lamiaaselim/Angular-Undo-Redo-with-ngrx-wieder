import { createAction, props } from '@ngrx/store';

export const updateUser = createAction(
  'Update User',
  props<{ name: string }>()
);
