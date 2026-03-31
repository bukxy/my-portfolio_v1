import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequesterService {

  private httpClient = inject(HttpClient);

  get<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(environment.apiURL + url, {params});
  }

  post<T>(url: string, params?: any, withCredentials = false): Observable<T> {
    return this.httpClient.post<T>(environment.apiURL + url, params, {withCredentials});
  }

  put<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.put<T>(environment.apiURL + url, params);
  }

  delete<T>(urlWithId: string): Observable<T> {
    return this.httpClient.delete<T>(environment.apiURL + urlWithId);
  }
}
