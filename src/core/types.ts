export type HttpStatusCode = number;

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiResponse<T = unknown, E = unknown> {
  code: HttpStatusCode;
  msg: string;
  data?: T;
  errorDetail?: E;
  pagination?: PaginationInfo;
}