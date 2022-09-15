import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Consultation } from '../model/consultation';
@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
 // private baseUrl = 'http://localhost:8080/api/categories';
 private baseUrl = 'http://localhost:8000/api/consultations';

  choixmenu : string  = 'A';
  list !: Consultation[];
  public formData !:  FormGroup; 
  consultationid:any
  constructor(private http: HttpClient) { }
 
 
  getData(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
getNumero()
{
   return this.http.get(`http://localhost:8000/get/code`);
}

  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
   
    return this.http.get(`${this.baseUrl}`);
  }
  
}
