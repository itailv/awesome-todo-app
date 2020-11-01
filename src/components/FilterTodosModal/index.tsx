import * as React from 'react';
import { Modal, Select, Typography } from 'antd';

import { Category, CategoryId, TodoPriorityEnum } from '../../api';
import style from './style.module.css';


interface SortAndFilterTodosModalProps {
    isVisible: boolean;
    categories: Category[];
    selectedCategories: Category[];
    selectedPriorities: Array<TodoPriorityEnum | 'None'>;
    onCancel: (e: React.MouseEvent<HTMLElement>) => void;
    onOk: (priorities: Array<TodoPriorityEnum | 'None'>, categories: Category[]) => void;
}

const FilterTodosModal: React.FC<SortAndFilterTodosModalProps> = ({
    isVisible,
    categories,
    selectedCategories, selectedPriorities,
    onOk, onCancel
}) => {

    const [localSelectedCategories, setLocalSelectedCategories] = React.useState<Category[]>(selectedCategories);
    const [localSelectedPriorities, setLocalSelectedPriorities] = React.useState<Array<TodoPriorityEnum | 'None'>>(selectedPriorities);

    const onSelectCategoriesChange = (categoriesIds: CategoryId[]): void => {
        setLocalSelectedCategories(categories.filter(category => categoriesIds.includes(category.id)));
    };

    const onSelectPriorityChange = (priority: Array<TodoPriorityEnum | 'None'>): void => {
        setLocalSelectedPriorities(priority);
    };

    const onOkClick = (): void => {
        onOk(localSelectedPriorities, localSelectedCategories);
    };

    const onCancelClick = (e: React.MouseEvent<HTMLElement>): void => {
        setLocalSelectedCategories(selectedCategories);
        setLocalSelectedPriorities(selectedPriorities);
        onCancel(e);
    };

    return (
        <Modal
            title="Filter Todos"
            visible={isVisible}
            onCancel={onCancelClick}
            okText={'Save'}
            onOk={onOkClick}
        >
            <div className={style.inputGroupFirst}>
                <Typography.Text className={style.inputTitle}>{'Categories'}</Typography.Text>
                <Select
                    placeholder="Select Categories"
                    mode="multiple"
                    onChange={onSelectCategoriesChange}
                    value={localSelectedCategories.map(category => category.id)}
                    allowClear
                >
                    {categories.map(category => <Select.Option key={category.id} value={category.id}>{category.content}</Select.Option>)}
                </Select>
            </div>
            <div className={style.inputGroup}>
                <Typography.Text className={style.inputTitle}>{'Priority'}</Typography.Text>
                <Select
                    mode="multiple"
                    placeholder="Select Priority"
                    value={localSelectedPriorities}
                    onChange={onSelectPriorityChange}
                    allowClear
                >
                    <Select.Option key={'None'} value={'None'}>{'None'}</Select.Option>
                    <Select.Option key={TodoPriorityEnum.LOW} value={TodoPriorityEnum.LOW}>{TodoPriorityEnum.LOW}</Select.Option>
                    <Select.Option key={TodoPriorityEnum.MEDIUM} value={TodoPriorityEnum.MEDIUM}>{TodoPriorityEnum.MEDIUM}</Select.Option>
                    <Select.Option key={TodoPriorityEnum.HIGH} value={TodoPriorityEnum.HIGH}>{TodoPriorityEnum.HIGH}</Select.Option>
                </Select>
            </div>
        </Modal>
    );
};

export default FilterTodosModal;