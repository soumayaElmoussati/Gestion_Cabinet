import { Component, OnInit, Inject } from '@angular/core';

import { FamilleService } from '../../service/famille.service';
import { MedicamentService } from '../../service/medicament.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from '../../model/categorie';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametreService } from 'src/app/service/parametre.service';

@Component({
  selector: 'app-add-medicament',
  templateUrl: './add-medicament.component.html',
  styles: [
  ]
})
export class AddMedicamentComponent implements OnInit {
  num: any;
  parametre: any = {};
  code!: string;
  familleList !: any[];
  get f() { return this.crudApi.formData.controls; }
  constructor(public crudApi: MedicamentService,private paraService: ParametreService, public fb: FormBuilder, public toastr: ToastrService,

    public familleService: FamilleService,
    private router: Router, 
    public dialogRef: MatDialogRef<AddMedicamentComponent>,

  ) { }
 
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") {
      this.infoForm()
      this.paraService.getData(1).subscribe(
        response => {
          this.parametre = response;
          this.f['code'].setValue(this.parametre.numc);

        }
      );
      
       }
  }


  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      duree: ['', [Validators.required]],
      utilisation: ['', [Validators.required]],
      ctrIndication : ['', [Validators.required]],
      
    });
  }

  ResetForm() {
    this.crudApi.formData.reset();
  }
  onSubmit() {

    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  
  addData() {
    this.crudApi.createData(this.crudApi.formData.value).
    subscribe(data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response["hydra:member"];}
       );                                            
      this.router.navigate(['/medicaments']);
    });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response["hydra:member"];}
         );
        this.router.navigate(['/medicaments']);
      });
  }

  
}
