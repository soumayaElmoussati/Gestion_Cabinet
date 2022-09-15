import { Component, OnInit, Inject} from '@angular/core';
import { MedicamentService } from '../../service/medicament.service';
import { ToastrService } from 'ngx-toastr';
import { Medicament } from '../../model/medicament';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { AddMedicamentComponent } from '../../medicament/add-medicament/add-medicament.component';
@Component({
  selector: 'app-list-medicament',
  templateUrl: './list-medicament.component.html',
  styles: [
  ]
})
export class ListMedicamentComponent implements OnInit {

  medicament !: Medicament;
  p: number = 1;

  codef: number = 0;
  control: FormControl = new FormControl('');
  constructor(public crudApi: MedicamentService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
   
    public dialogRef: MatDialogRef<AddMedicamentComponent>,) { }

  ngOnInit() {

  
      this.getData();

    }


  
  addMedicament() {debugger
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddMedicamentComponent, dialogConfig);
  }




  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        this.crudApi.list = response["hydra:member"];
      }
    );

  }


  
  
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this medicament ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
           
              this.getData();
           
          },
          error => console.log(error));
    }
  }
  selectData(item: Medicament) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";

    this.matDialog.open(AddMedicamentComponent, dialogConfig);
  }

}
