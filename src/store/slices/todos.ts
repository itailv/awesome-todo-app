import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';

import { CategoryId, Todo } from '../../api';


const todosAdapter = createEntityAdapter<Todo>();

export const slice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),

  reducers: {
    removeTodo: todosAdapter.removeOne,
    addTodo: todosAdapter.addOne,
    updateTodo: todosAdapter.updateOne,
    toggleTodo: (state, action: PayloadAction<CategoryId>): void => {
      const id = action.payload;
      const todo = state.entities[id];

      if (todo) {
        todosAdapter.updateOne(
          state,
          {
            id,
            changes: { completed: !todo.completed }
          });
      }

    },
    setTodos: todosAdapter.setAll,
  },
});

export const { actions } = slice;
export const selectors = todosAdapter.getSelectors();

export default slice.reducer;