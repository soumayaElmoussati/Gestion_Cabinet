import { Component, OnInit, Inject } from '@angular/core';
import { Medicament } from '../../model/medicament';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicamentService } from '../../service/medicament.service';
import { NgForm } from '@angular/forms';
import { Ordonance } from '../../model/ordonance';
import { ConsultationService } from '../../service/consultation.service';
import { OrdonanceService } from '../../service/ordonance.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ordonance',
  templateUrl: './add-ordonance.component.html',
  styles: [
  ]
})
export class AddOrdonanceComponent implements OnInit {
  i = 0;
  formData!: FormGroup;
  isValid: boolean = true;
  constructor(public service: OrdonanceService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    public dialogRef: MatDialogRef<AddOrdonanceComponent>,public serviceApi:ConsultationService,
    public medicamentService: MedicamentService,
    public ordonanceService: OrdonanceService,
    public consultationService: ConsultationService, public fb: FormBuilder) { }
  get f() { return this.formData.controls; }


  ngOnInit() {
    if (this.ordonanceService.choixmenu == 'A') {
      this.InfoForm();
    }
    this.medicamentService.getAll().subscribe(
      response => { this.medicamentService.list = response["hydra:member"]; }
    )
  }


  InfoForm() {
    this.ordonanceService.formData = this.fb.group({
      id: null,
      numero: 0,
      code: '',
      medicament: '',
      nbr: 0,
      duree: '',
      utilisation: '',
      consultation: '',

    });
  }


  onSubmit() {
    // this.ordonanceService.formData.value.medicament= String( "/api/medicaments/"+this.ordonanceService.formData.value.medicament);
    this.ordonanceService.formData.value.consultation = this.ordonanceService.idConsultation;
    if (this.ordonanceService.choixmenu == 'A') {
      this.ordonanceService.formData.value.medicament = String("/api/medicaments/" + this.ordonanceService.formData.value.medicament);
      this.addData();

    }
    else {
      this.updateData();
      console.log(this.formData.value)
    }
  }

  validateForm(formData: any) {
    this.isValid = true;
    if (formData.code == '')
      this.isValid = false;
    else if (formData.nbre == 0)
      this.isValid = false;
    return this.isValid;
  }
  addData() {
    console.log(this.serviceApi.consultationid)
    this.dialogRef.close();
   
  }
  updateData() {
    this.ordonanceService.formData.value.medicament = String("/api/medicaments/" + this.ordonanceService.formData.value.medicament);
    this.ordonanceService.updatedata(this.ordonanceService.formData.value.id, this.ordonanceService.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.dialogRef.close();
      });
    this.ordonanceService.getConsultationOrdonance(this.serviceApi.formData.value.id).subscribe(
      response => {
        this.ordonanceService.list = response;
      }
    );

  }

  onChange(ctrl :any){
    if(ctrl.selectedIndex == -1){
      this.f['code'].setValue(0);
      this.f['medicament'].setValue('');
    
    }
    else{
      this.f['code'].setValue(this.medicamentService.list[ctrl.selectedIndex].code);
      this.f['libelle'].setValue(this.medicamentService.list[ctrl.selectedIndex].libelle);
        }
      }
  
}