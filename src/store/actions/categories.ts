import * as TodosApi from '../../api';
import { actions as categoriesActions } from '../slices/categories';
import { AppDispatch, AppThunk } from '..';


export const fetchCategories = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const categories = await TodosApi.fetchCategories();

        dispatch(categoriesActions.setCategories(categories));
    } catch (error) {
        throw error;
    }
};

export const addCategory = (category: TodosApi.CategoryCreationProps): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const id = await TodosApi.addCategory(category);
        const finalCategory: TodosApi.Category = {
            id,
            ...category,
        };
        dispatch(categoriesActions.addCategory(finalCategory));
    } catch (error) {
        throw error;
    }
};

export const removeCategory = (id: TodosApi.CategoryId): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await TodosApi.removeCategory(id);

        dispatch(categoriesActions.removeCategory(id));
    } catch (error) {
        throw error;
    }
};

export const updateTodo = (id: TodosApi.CategoryId, changes: TodosApi.CategoryEditableProps) => async (dispatch: AppDispatch) => {
    try {
        await TodosApi.updateCategory(id, changes);

        dispatch(categoriesActions.updateCategory({ id, changes }));
    } catch (error) {
        throw error;
    }
};