import { Component, OnInit, Inject } from '@angular/core';
import { ReglementService } from '../../service/reglement.service';
import { ToastrService } from 'ngx-toastr';
import { Reglement } from '../../model/reglement';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddReglementComponent } from '../../reglement/add-reglement/add-reglement.component';

@Component({
  selector: 'app-list-reglement',
  templateUrl: './list-reglement.component.html',
  styles: [
  ]
})
export class ListReglementComponent implements OnInit {
  reglement !: Reglement;
  constructor(public crudApi: ReglementService, public toastr: ToastrService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddReglementComponent>,) { }

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
  selectData(item : Patient) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="80%";
    this.matDialog.open(AddPatientComponent, dialogConfig);
   
  }
  addPatient()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="80%";
      this.matDialog.open(AddPatientComponent, dialogConfig);
    }

}
