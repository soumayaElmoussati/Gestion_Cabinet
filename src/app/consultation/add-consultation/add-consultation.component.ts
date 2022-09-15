import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../model/patient';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Consultation } from '../../model/consultation';
import { ConsultationService } from '../../service/consultation.service';
import { CompteurService } from '../../service/compteur.service';
import { OrdonanceService } from '../../service/ordonance.service';
import { DatePipe } from '@angular/common';
import { AddOrdonanceComponent } from '../../ordonance/add-ordonance/add-ordonance.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Observable } from "rxjs";
import { Medicament } from '../../model/medicament';
import { Compteur } from '../../model/compteur';
import { Ordonance } from '../../model/ordonance';

@Component({
  selector: 'app-add-consultation',
  templateUrl: './add-consultation.component.html',
  styles: [
  ]
})
export class AddConsultationComponent implements OnInit {
  isValid: boolean = true;
  articleService: any;
  Date: any;
  numero = 0;
  client: any = {};
  annee = 0;
  dialogRef: any;
  event: any;
  selecteddata: any;
  cons:any;
  compteur:any;
  code: any;
  constructor(public serviceApi: ConsultationService,
    public compteurservice: CompteurService,
    public ordonanceService: OrdonanceService,
    private dialog: MatDialog, public fb: FormBuilder,
    public patientService: PatientService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private currentRoute: ActivatedRoute,
    private datePipe: DatePipe) { }
  get f() {
    return this.serviceApi.formData.controls
  }
  ngOnInit() {
  
    if (this.serviceApi.choixmenu == "A") {
     
      this.InfoForm()
     
      this.Date = this.transformDate(new Date(Date.now()));
      this.annee = (this.Date).toString().substring(0, 4);
      
      this.f['annee'].setValue(this.annee);
      this.f['dateConsultation'].setValue(this.Date);
      alert(this.annee);
      this.onSelectCode(this.annee);
    }
    this.patientService.getAll().subscribe(
      response => {
        this.patientService.list = response["hydra:member"];
      }
    );
    this.ordonanceService.getConsultationOrdonance(this.serviceApi.formData.value.id).subscribe(
      response => {
        this.ordonanceService.list = response
        console.log(this.ordonanceService.list);
      }
    );


  }


  InfoForm() {
    this.serviceApi.formData = this.fb.group({
      id: null,
      patient: ['', [Validators.required]],
      numero: [0, [Validators.required]],
      dateConsultation: ['', [Validators.required]],
      observation: ['', [Validators.required]],
      annee: [0, [Validators.required]],
      montant: [0, [Validators.required]],
    });
  }

  resetForm() {
    this.serviceApi.formData.reset();
  }

  addOrdonance(lrdvIndex : any, Id: any) {
    const dialogConfig = new MatDialogConfig();
    this.ordonanceService.choixmenu = "A";
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { lrdvIndex, Id };
    this.dialog.open(AddOrdonanceComponent, dialogConfig).afterClosed().subscribe(b10 => {
     
    });
  }


  
  editOrdonance(item: any) {
    this.ordonanceService.choixmenu = "M";
    this.ordonanceService.formData = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddOrdonanceComponent, dialogConfig).afterClosed().subscribe(b10 => {
    });
  }

  onDelete(item: Ordonance, id: any, i: number) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.ordonanceService.deleteData(id)
        .subscribe(
          data => {

            this.toastr.warning(' data successfully deleted!');
            this.ordonanceService.getConsultationOrdonance(this.serviceApi.formData.value.id).subscribe(
              response => {
                this.ordonanceService.list = response;
              }
            );
          },
          error => console.log(error));
    }

  }


  validateForm() {
    this.isValid = true;

    if (this.serviceApi.formData.value.codePaient == 0)
      this.isValid = false;

    else if (this.serviceApi.list.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    if (this.serviceApi.choixmenu = "A") {
      this.addConsultation()
    }
    else {
      this.updateConsultation()
    }

  }
  onSelectCode(id : number) {
  alert("select annee");
    this.compteurservice.getData(1).subscribe(
      response => {
        this.compteur = response;
        alert(this.compteur.numconsultation);
        this.numero = (this.annee * 10000) + this.compteur.numconsultation;
        this.f['numero'].setValue(this.numero);
       
      }
    );
  }
  onChange($event: any) {
    //this.serviceApi.formData.value.patient = String("/api/patients/"+ this.serviceApi.formData.value.patient);
  }
  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(this.serviceApi.formData.value)
  }
  addConsultation() {
    this.serviceApi.formData.value.patient = String("/api/patients/" + this.serviceApi.formData.value.patient);
    
    this.serviceApi.createData(this.serviceApi.formData.value).
      subscribe(data => {
        this.data = data;
        this.serviceApi.consultationid = String("/api/consultations/" + this.data.id);

        this.toastr.success('Consultation ajoutée avec Success');
        this.serviceApi.getAll().subscribe(
          response => { this.serviceApi.list = response["hydra:member"]; }
        );
       


        this.compteurservice.createData({'annee':String(this.serviceApi.formData.value.annee),'consultation':String("/api/consultations/" + this.data.id)}).
        subscribe(data => {
        console.log(data)

        })
        if (this.ordonanceService.choixmenu == 'A') {
          this.ordonanceService.formData.value.consultation = this.serviceApi.consultationid
          this.ordonanceService.createData(this.ordonanceService.formData.value).
            subscribe(data => {
              this.toastr.success('Ordonance ajoutée avec Success');

            });
           
          this.ordonanceService.getConsultationOrdonance(this.serviceApi.formData.value.id).subscribe(
            response => {
              this.ordonanceService.list = response;
            }
          );
          this.router.navigate(['/']);
          this.dialogRef.close();
        }
        /*   this.ordonanceService.getConsultationOrdonance(this.serviceApi.formData.value.id).subscribe(
             response => {
               this.ordonanceService.list = response;
             }
           );*/
      }
      );
  }
  updateConsultation() {
    this.serviceApi.updatedata(this.serviceApi.formData.value.id, this.serviceApi.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.dialogRef.close();
      }
      );
  }
  OnSelectClient(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['libPatient'].setValue('');
      this.f['codePatient'].setValue('');
    }
    else {
      this.f['libPatient'].setValue(this.patientService.list[ctrl.selectedIndex - 1].nom);
      this.f['codepatient'].setValue(this.patientService.list[ctrl.selectedIndex - 1].code);
    }
  }

}

