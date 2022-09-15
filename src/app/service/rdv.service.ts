import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Rdv } from '../model/rdv';
@Injectable({
  providedIn: 'root'
})
export class RdvService {
 // private baseUrl = 'http://localhost:8080/api/categories';
 private baseUrl = 'http://localhost:8000/api/rdvs';

  choixmenu : string  = 'A';
  list ! : Rdv[];
  public formData !:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
getNumero()
{
   return this.http.get(`${this.baseUrl}`);
}

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: string): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
   
    return this.http.get(`${this.baseUrl}`);
  }
  
}

