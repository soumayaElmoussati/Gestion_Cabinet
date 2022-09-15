import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   Label  = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre','Decembre'];
  
  data = [
    { data: [250, 307, 60, 180, 406, 317,450, 607, 460, 298, 481,520], label: 'Statistique Des Ventes' }
  ];

  constructor() { }
}
