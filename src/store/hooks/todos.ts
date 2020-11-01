import { useSelector } from "react-redux";

import { selectors as todosSelectors } from '../slices/todos';
import { RootState } from "..";
import { Todo, TodoId } from "../../api";


export function useTodos(): Todo[] {
    return useSelector(
        (state: RootState) => todosSelectors.selectAll(state.todos),
    );
}

export function useTodo(id: TodoId): Todo | undefined {
    return useSelector(
        (state: RootState) => todosSelectors.selectById(state.todos, id),
    );
}