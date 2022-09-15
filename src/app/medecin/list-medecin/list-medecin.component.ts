import { Component, OnInit,Inject } from '@angular/core';
import { MedecinService } from '../../service/medecin.service';
import { ToastrService } from 'ngx-toastr';
import { Medecin } from '../../model/medecin';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddMedecinComponent } from '../../medecin/add-medecin/add-medecin.component';
@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styles: [
  ]
})
export class ListMedecinComponent implements OnInit {

 p=1;
    Medecin !: Medecin;
    constructor(public crudApi: MedecinService, public toastr: ToastrService,
      private router: Router, public fb: FormBuilder,
      private matDialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef:MatDialogRef<AddMedecinComponent>,) { }
  
    ngOnInit() {
      
      this.getData();
    }
  
    getData() {
      this.crudApi.getAll().subscribe(
        response => { this.crudApi.list = response["hydra:member"]; 
      }
      );
    }
  
    removeData(id: number) {
      if (window.confirm('Are sure you want to delete this Catégorie ?')) {
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
    selectData(item : Medecin) {
      this.crudApi.choixmenu = "M";
      this.crudApi.formData = this.fb.group(Object.assign({},item));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      
      this.matDialog.open(AddMedecinComponent, dialogConfig);
    }
    addMedecin()
    {
      this.crudApi.choixmenu = "A";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width="50%";
        this.matDialog.open(AddMedecinComponent, dialogConfig);
      }
    }
  
  
