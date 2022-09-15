import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Horaire } from '../model/horaire';
@Injectable({
  providedIn: 'root'
})
export class HoraireService {
 // private baseUrl = 'http://localhost:8080/api/categories';
 private baseUrl = 'http://localhost:8000/api/horaires';

  choixmenu : string  = 'A';
  list !: Horaire[];
  public formData !:  FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
getNumero()
{
   return this.http.get(`${this.baseUrl}`);
}

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
   
    return this.http.get(`${this.baseUrl}`);
  }
  
}
