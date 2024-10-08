import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import {
  addTodo,
  changeMood,
  removeTodo,
  selectList,
  toggleTodo,
} from './store/todo/todo.actions';
import * as fromTodo from './store/todo/todo.selector';
import * as fromUser from './store/user/user.selector';
import { State } from './store';
import { Todo } from './store/todo/todo';
import { updateUser } from './store/user/user.action';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly lists$;
  readonly activeList$;
  readonly mood$;
  readonly todos$;
  readonly disableUndo$: Observable<boolean>;
  readonly disableRedo$: Observable<boolean>;
  readonly username$;

  constructor(
    private toastr: ToastrService,
    private readonly store: Store<State>
  ) {
    this.lists$ = this.store
      .select((state) => state.todo.lists)
      .pipe(map((lists) => Object.values(lists)));

    this.activeList$ = this.store.select(fromTodo.selectActiveList);

    this.mood$ = this.store
      .select(fromTodo.selectActiveList)
      .pipe(select((list) => list.mood));

    this.todos$ = this.store
      .select(fromTodo.selectActiveList)
      .pipe(select((list) => list.todos));

    this.disableUndo$ = this.store.select(fromTodo.selectCanUndo()).pipe(
      map((canUndo) => {
        console.log('Can Undo:', canUndo);
        return !canUndo;
      })
    );

    this.disableRedo$ = this.store.select(fromTodo.selectCanRedo()).pipe(
      map((canRedo) => {
        console.log('Can Redo:', canRedo);
        return !canRedo;
      })
    );

    this.username$ = this.store
      .select(fromUser.selectUsername)
      .pipe(map((username) => username));
  }

  add(text: string): void {
    this.store.dispatch(addTodo({ text }));
  }

  toggle({ id }: Todo): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  remove({ id }: Todo): void {
    this.store.dispatch(removeTodo({ id }));
  }

  moodChange() {
    this.store.dispatch({ type: 'BREAK_MERGE' });
  }

  moodInput(mood: number) {
    this.store.dispatch(changeMood({ mood }));
  }

  undo(): void {
    this.store.dispatch({ type: 'UNDO' });
    this.toastr.success('Undo action performed');
  }

  redo(): void {
    this.store.dispatch({ type: 'REDO' });
    this.toastr.warning('Redo action performed');
  }

  // selectList(id: string): void {
  //   this.store.dispatch(selectList({ id }));
  // }

  selectList(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.store.dispatch(selectList({ id: selectedValue }));
  }

  updateUsername(username: string) {
    this.store.dispatch(updateUser({ name: username }));
  }
}
