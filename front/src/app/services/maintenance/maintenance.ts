import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get isMaintenance(): boolean {
    return environment.maintenance;
  }

  load(http: HttpClient) {
    return Promise.resolve(); // plus besoin du config.json
  }
}
