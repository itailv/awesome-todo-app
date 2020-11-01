export function isNotEmpty<T>(value: T | undefined | null): value is T {
    if (value !== undefined || value !== null)
        return true;
    return false;
}
