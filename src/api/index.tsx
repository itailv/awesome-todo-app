export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
export * from './resources/todos';
export * from './resources/categories';
