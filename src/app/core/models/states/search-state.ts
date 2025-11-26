import {LoadingStatus} from '../loading-status.enum';

export interface SearchState {
  total: number;
  pageNumber: number;
  loadingStatus: LoadingStatus;
}
