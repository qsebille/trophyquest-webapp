import {LoadingStatus} from '../loading-status.enum';

export interface SearchState<T> {
  results: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
  loadingStatus: LoadingStatus;
}
