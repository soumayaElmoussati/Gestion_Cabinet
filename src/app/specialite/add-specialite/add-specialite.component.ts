import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from '../../service/specialite.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-specialite',
  templateUrl: './add-specialite.component.html',
  styles: [
  ]
})
export class AddSpecialiteComponent implements OnInit {
  num : any;
  code : any;
  private baseUrl = 'http://localhost:8000';
    constructor(public crudApi: SpecialiteService, public fb: FormBuilder, public toastr: ToastrService,
      private router: Router,public dialogRef:MatDialogRef<AddSpecialiteComponent>) { }
      get f() { return this.crudApi.formData.controls }
    ngOnInit() {
  
      if (this.crudApi.choixmenu == "A") 
      { this.infoForm() 
      this.onSelectCode()};
    }
  
    onSelectCode() {
      
      this.crudApi.getNumero().subscribe(
        response => {
        
          this.num = response;
          this.code = (1000 + this.num +1).toString().substring(1);
        
          this.f['code'].setValue(this.code);
        }
      );
    }
  
    infoForm() {
      this.crudApi.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
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
  
  lister()
  {
    this.router.navigate(['/specialites']);
  }
  
    addData() {
      
      this.crudApi.createData(this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response["hydra:member"];}
           );                                            
          this.router.navigate(['/specialites']);
        });
    }
    updateData() {
     console.log()
      this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
        subscribe(data => {
          this.dialogRef.close();
          this.crudApi.getAll().subscribe(
            response =>{this.crudApi.list = response["hydra:member"];}
           );
          this.router.navigate(['/specialites']);
        });
    }
  
}
