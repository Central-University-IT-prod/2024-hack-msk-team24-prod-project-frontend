import { Injectable } from '@angular/core';
import { DefaultService, Configuration } from '../../../generated';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiService!: DefaultService;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiService = new DefaultService(httpClient, environment.apiBaseUrl, new Configuration());
  }
}
