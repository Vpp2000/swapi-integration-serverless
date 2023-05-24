export interface PagedResponse<E> {
    count: number;
    next: string | null;
    previous: string | null;
    results: E[]
}
