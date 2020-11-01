import { useSelector } from "react-redux";

import { selectors as categoriesSelectors } from '../slices/categories';
import { RootState } from "..";
import { Category, CategoryId } from "../../api";


export function useCategories(ids?: CategoryId[]): Category[] {
    if (ids) {
        return useSelector(
            (state: RootState) => categoriesSelectors.selectAll(state.categories)
                .filter(category => ids.includes(category.id))
        );
    } else {
        return useSelector(
            (state: RootState) => categoriesSelectors.selectAll(state.categories),
        );
    }
}

export function useCategory(id: CategoryId): Category | undefined {
    return useSelector(
        (state: RootState) => categoriesSelectors.selectById(state.categories, id),
    );
}