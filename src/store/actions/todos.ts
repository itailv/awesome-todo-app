import * as TodosApi from '../../api';
import { actions as todosActions } from '../slices/todos';
import { AppDispatch, AppThunk } from '..';


export const fetchTodos = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const todos = await TodosApi.fetchTodos();

        dispatch(todosActions.setTodos(todos));
    } catch (error) {
        throw error;
    }
};

export const addTodo = (todo: TodosApi.TodoCreationProps): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const id = await TodosApi.addTodo(todo);
        const finalTodo: TodosApi.Todo = {
            id,
            completed: false,
            ...todo,
        };

        dispatch(todosActions.addTodo(finalTodo));
    } catch (error) {
        throw error;
    }
};

export const removeTodo = (id: TodosApi.TodoId): AppThunk => async (dispatch: AppDispatch) => {
    try {
        await TodosApi.removeTodo(id);

        dispatch(todosActions.removeTodo(id));
    } catch (error) {
        throw error;
    }
};

export const updateTodo = (id: TodosApi.TodoId, changes: TodosApi.TodoEditableProps) => async (dispatch: AppDispatch) => {
    try {
        await TodosApi.updateTodo(id, changes);

        dispatch(todosActions.updateTodo({ id, changes }));
    } catch (error) {
        throw error;
    }
};

export const toggleTodo = (id: TodosApi.TodoId) => async (dispatch: AppDispatch) => {
    try {
        await TodosApi.toggleTodo(id);

        dispatch(todosActions.toggleTodo(id));
    } catch (error) {
        throw error;
    }
};
