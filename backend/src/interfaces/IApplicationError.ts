export interface IApplicationError extends Error {
    status: number;
    message: string;
    error?: any;
}
