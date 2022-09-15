import { Component, OnInit, Inject } from '@angular/core';
import { ConsultationService } from '../../service/consultation.service';
import { ToastrService } from 'ngx-toastr';
import { Consultation } from '../../model/consultation';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder }
  from '@angular/forms';
import { AddConsultationComponent } from '../../consultation/add-consultation/add-consultation.component';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-list-consultation',
  templateUrl: './list-consultation.component.html',
  styles: [
  ]
})
export class ListConsultationComponent implements OnInit {



  consultation !: Consultation;
  p: number = 1;
  codef: number = 0;
  idPatient: any;
  constructor(public serviceApi: ConsultationService, public patientService: PatientService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<AddConsultationComponent>) { }

  ngOnInit() {


    this.getData();

  }



  addConsultation() {
    this.serviceApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddConsultationComponent, dialogConfig);
  }




  getData() {

    this.serviceApi.getAll().subscribe(
      response => {
        this.serviceApi.list = response["hydra:member"];
      }
    );

  }




  removeData(id: number, item: any) {/*
    if (window.confirm('Are sure you want to delete this medicament ?')) {
      this.idPatient=this.serviceApi.formData.value.patient.substr(14);
      this.patientService.deleteData(this.idPatient).subscribe(
        ( reponse: any) => {
          console.log(reponse);
          this.toastr.warning(' data successfully deleted!');
         
            this.getData();
         
        }),
        this.serviceApi.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning(' data successfully deleted!');
             
                this.getData();
             
            },
            error => console.log(error));
      }*/
  }
  selectData(item: any) {
    this.serviceApi.choixmenu = "M";
    this.serviceApi.formData = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.matDialog.open(AddConsultationComponent, dialogConfig);
  }

}
