export interface IResponse<TData = unknown> {
    message?: string;
    data?: TData;
}