import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from '../../model/patient';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { NgForm } from '@angular/forms';
import { Lreglement } from '../../model/lreglement';
import { ReglementService } from '../../service/reglement.service';
import { LreglementService } from '../../service/lreglement.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { AddLreglemntComponent } from '../../reglement/add-lreglemnt/add-lreglemnt.component';
@Component({
  selector: 'app-add-reglement',
  templateUrl: './add-reglement.component.html',
  styles: [
  ]
})
export class AddReglementComponent implements OnInit {
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
      if(this.data.lcommandeIndex==null)
      {
        this.InfoForm();
      }
      else 
      {
       this.service.formData =this.fb.group(Object.assign({},this.service.list[this.data.lcommandeIndex]));
      }
     this.service.getAll().subscribe(
        response =>{this.service.list= response;}
       );
  }
  
  
  InfoForm() {
    this.service.formData = this.fb.group({
        id: null,
        numero :this.data.numero,
        qte : 0,
        pu : 0,
        tva : 0,
        totht : 0,
        tottva :0,
        totttc :0,
        libart :'',
        code_article :'',
        comm_id : this.data.id_commande,
        
      });
    } 
  
  
 
  
  cal(){
   
    this.wtotht =  parseFloat((this.formData.value.qte * this.formData.value.pu).toFixed(3));
    this.wtottva = parseFloat(((this.wtotht * this.formData.value.tva)*0.01).toFixed(3)); 
    this.wtotttc = parseFloat((this.wtotht + this.wtottva).toFixed(3));
    this.f['totht'].setValue(this.wtotht);
    this.f['tottva'].setValue(this.wtottva);
    this.f['totttc'].setValue(this.wtotttc);
  }
  
  onSubmit() {
    if(this.data.lcommandeIndex==null)
    {
      this.service.list.push(this.service.formData.value);
      this.dialogRef.close();
    }
    else
  {
    this.service.list[this.data.lcommandeIndex] = this.service.formData.value;
  }
  this.dialogRef.close();
  }
  
  validateForm(formData:Lreglement{
    this.isValid=true;
    if(formData.code =='')
      this.isValid=false;
      else if(formData.qte ==0)
      this.isValid=false;
      return this.isValid;
  }
  }
  



