import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FirebaseRestService {

  constructor(private http: Http) { }

  getEndpoint(url: string, endpoint: string): Observable<any> {
    return this.http.get(url + endpoint);
  }
}

