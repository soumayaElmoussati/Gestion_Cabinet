import { Component, OnInit, Inject } from '@angular/core';
import { ReglementService } from '../../service/reglement.service';
import { ToastrService } from 'ngx-toastr';
import { Reglement } from '../../model/reglement';
import { Lreglement } from '../../model/lreglement';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReglementComponent } from '../../reglement/add-reglement/add-reglement.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-lreglemnt',
  templateUrl: './add-lreglemnt.component.html',
  styles: [
  ]
})
export class AddLreglemntComponent implements OnInit {
  public formData !:  FormGroup; 
  isValid:boolean=true;
    wtotht = 0;
    wtottva = 0;
    wtotttc = 0;
    constructor( public service: ReglementService,private toastr :ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: any,
          public dialogRef:MatDialogRef<AddLreglemntComponent>,
         public fb: FormBuilder){}
          get f() { return this.service.formData.controls; }
         
  
    ngOnInit() {
      if(this.data.lreglementIndex==null)
      {
        this.InfoForm();
      }
      else 
      {
       this.formData =this.fb.group(Object.assign({},this.service.list[this.data.lreglementIndex]));
      }
     this.service.getAll().subscribe(
        response =>{this.service.list= response;}
       );
  }
  
  
  InfoForm() {
    this.service.formData = this.fb.group({
        id: null,
        numero :this.data.numero,
        modreg : '',
        banque : '',
        echeance : '',
        montant : 0,
        datreg :'',
       
        
      });
    } 
  
  
 
  
  cal(){
   
  
  }
  
  onSubmit() {
    if(this.data.lreglementIndex==null)
    {
      this.service.list.push(this.service.formData.value);
      this.dialogRef.close();
    }
    else
  {
    this.service.list[this.data.lreglementIndex] = this.service.formData.value;
  }
  this.dialogRef.close();
  }
  
  validateForm(formData:Lreglement){
    this.isValid=true;
    if(formData.modreg =='')
      this.isValid=false;
      else if(formData.montant ==0)
      this.isValid=false;
      return this.isValid;
  }
}
