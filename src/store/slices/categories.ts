import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { Category } from '../../api';


const categoriesAdapter = createEntityAdapter<Category>();

export const slice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState(),

  reducers: {
    removeCategory: categoriesAdapter.removeOne,
    addCategory: categoriesAdapter.addOne,
    updateCategory: categoriesAdapter.updateOne,
    setCategories: categoriesAdapter.setAll,
  },
});

export const { actions } = slice;
export const selectors = categoriesAdapter.getSelectors();

export default slice.reducer;