export interface PsnFetchResponse {
    status: 'OK' | 'ERROR';
    lambdaStatus: number;
    functionError: boolean;
}
