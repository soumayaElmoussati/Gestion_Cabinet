import { Component, OnInit,Inject } from '@angular/core';
import { DomaineService } from '../../service/domaine.service';
import { ToastrService } from 'ngx-toastr';
import { Domaine } from '../../model/domaine';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AddDomaineComponent } from '../../domaine/add-domaine/add-domaine.component';
@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styles: [
  ]
})
export class ListDomaineComponent implements OnInit {

  domaine !: Domaine;
  constructor(public crudApi: DomaineService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddDomaineComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response["hydra:member"]; 
    }
    );
  }

  removeData(id : number) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!');
            this.getData();
            this.router.navigate(['/domaines']);
          },
          error => console.log(error));
    }
  }
  selectData(item : Domaine) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddDomaineComponent, dialogConfig);
  }
  addDomaine()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddDomaineComponent, dialogConfig);
    }
  }

