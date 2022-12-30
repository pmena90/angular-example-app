import { HttpHeaders } from "@angular/common/http";

export interface IResponse {
  result: boolean;
  message: string;
  data?: any;
  headers?: HttpHeaders;
}
