import { v4 as uuid } from 'uuid';

import { sleep } from "../";


export type CategoryId = string;
export type CategoryContent = string;
export interface Category {
    id: CategoryId;
    content: CategoryContent;
}
export interface CategoryCreationProps {
    content: CategoryContent;
}
export type CategoryEditableProps = Partial<CategoryCreationProps>;


export async function fetchCategories(ids?: CategoryId[]): Promise<Category[]> {
    await sleep(200);

    const DEFAULT_CATEGORIES: Category[] = [
        { content: 'Food', id: '1' },
        { content: 'Health', id: '2' },
        { content: 'Errands', id: '3' },
        { content: 'Work', id: '4' },
    ];
    return [...DEFAULT_CATEGORIES];
}

export async function addCategory(category: CategoryCreationProps): Promise<CategoryId> {
    await sleep(200);

    return uuid();
}

export async function removeCategory(id: CategoryId): Promise<void> {
    await sleep(200);
}

export async function updateCategory(id: CategoryId, changes: CategoryEditableProps): Promise<void> {
    await sleep(200);
}