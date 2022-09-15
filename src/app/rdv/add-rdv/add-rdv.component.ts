import { Component, OnInit, Inject} from '@angular/core';
import { RdvService } from '../../service/rdv.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Rdv } from '../../model/rdv';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styles: [
  ]
})
export class AddRdvComponent implements OnInit {
  num: any;
 
  Date :any;
   
  constructor(public crudApi: RdvService, public fb: FormBuilder, public toastr: ToastrService,
   
    private router: Router, private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddRdvComponent> ) { }
  get f() { return this.crudApi.formData.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { 
      
      this.infoForm() 
      this.Date = this.transformDate(new Date(Date.now()));
      alert(this.Date);
      this.f['dateRdv'].setValue(this.Date);};
    
   
    
  }

  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      dateRdv: ['', [Validators.required]],
      nom1: ['', [Validators.required]],
      obs1: [' ', [Validators.required]],
      conf1: [' ', [Validators.required]],
      nom2: ['', [Validators.required]],
      obs2: [' ', [Validators.required]],
      conf2: [' ', [Validators.required]],  
      nom3: ['', [Validators.required]],
      obs3: [' ', [Validators.required]],
      conf3: [' ', [Validators.required]],  
      nom4: ['', [Validators.required]],
      obs4: [' ', [Validators.required]],
      conf4: [' ', [Validators.required]],
      nom5: ['', [Validators.required]],
      obs5: [' ', [Validators.required]],
      conf5: [' ', [Validators.required]],  
      nom6: ['', [Validators.required]],
      obs6: [' ', [Validators.required]],
      conf6: [' ', [Validators.required]], 
      nom7: ['', [Validators.required]],
      obs7: [' ', [Validators.required]],
      conf7: [' ', [Validators.required]],
      nom8: ['', [Validators.required]],
      obs8: [' ', [Validators.required]],
      conf8: [' ', [Validators.required]],  
      nom9: ['', [Validators.required]],
      obs9: [' ', [Validators.required]],
      conf9: [' ', [Validators.required]], 
      nom10: ['', [Validators.required]],
      obs10: [' ', [Validators.required]],
      conf10: [' ', [Validators.required]],
      nom11: ['', [Validators.required]],
      obs12: [' ', [Validators.required]],
      conf12: [' ', [Validators.required]],  
      nom13: ['', [Validators.required]],
      obs13: [' ', [Validators.required]],
      conf13: [' ', [Validators.required]], 
      nom14: ['', [Validators.required]],
      obs14: [' ', [Validators.required]],
      conf14: [' ', [Validators.required]],
      nom15: ['', [Validators.required]],
      obs15: [' ', [Validators.required]],
      conf15: [' ', [Validators.required]],  
      nom16: ['', [Validators.required]],
      obs16: [' ', [Validators.required]],
      conf16: [' ', [Validators.required]],
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
        response =>{this.crudApi.list = response;}
       );                                            
      this.router.navigate(['/rdvs']);
    });
  }
  updateData() {
    this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe(data => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response =>{this.crudApi.list = response;}
         );
        this.router.navigate(['/rdvs']);
      });
  }
  transformDate(date :Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
