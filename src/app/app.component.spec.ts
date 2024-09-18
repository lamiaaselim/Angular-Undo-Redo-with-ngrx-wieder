import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { addTodo, selectList, toggleTodo, removeTodo } from './store/todo/todo.actions';
import { updateUser } from './store/user/user.action';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const initialState = {
    todo: {
      lists: {
        1: { id: '1', name: 'List 1', todos: [], mood: 50 },
        2: { id: '2', name: 'List 2', todos: [], mood: 70 },
      },
      activeList: '1',
    },
    user: {
      username: 'TestUser',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule], // Import FormsModule if needed
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // detect any changes to the fixture instance
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should select lists from the store', () => {
    component.lists$.subscribe((lists) => {
      expect(lists.length).toBe(2);
      expect(lists[0].name).toBe('List 1');
    });
  });

  it('should select the active list from the store', () => {
    component.activeList$.subscribe((list) => {
      expect(list.id).toBe('1');
    });
  });

  it('should dispatch the addTodo action', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.add('New Todo');
    expect(dispatchSpy).toHaveBeenCalledWith(addTodo({ text: 'New Todo' }));
  });

  it('should dispatch the toggleTodo action', () => {
    const todo = { id: '1', text: 'Test Todo', checked: false };
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.toggle(todo);
    expect(dispatchSpy).toHaveBeenCalledWith(toggleTodo({ id: '1' }));
  });

  it('should dispatch the removeTodo action', () => {
    const todo = { id: '1', text: 'Test Todo', checked: false };
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.remove(todo);
    expect(dispatchSpy).toHaveBeenCalledWith(removeTodo({ id: '1' }));
  });

  it('should dispatch selectList on change event', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const mockEvent = { target: { value: '2' } } as unknown as Event;
    component.selectList(mockEvent);
    expect(dispatchSpy).toHaveBeenCalledWith(selectList({ id: '2' }));
  });

  it('should dispatch updateUser when username is updated', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.updateUsername('UpdatedUser');
    expect(dispatchSpy).toHaveBeenCalledWith(updateUser({ name: 'UpdatedUser' }));
  });

  it('should call store dispatch for undo', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.undo();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'UNDO' });
  });

  it('should call store dispatch for redo', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.redo();
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'REDO' });
  });
});
