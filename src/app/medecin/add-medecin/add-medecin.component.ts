import { Component, OnInit, Inject} from '@angular/core';
import { MedecinService } from '../../service/medecin.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';
import { Medecin } from '../../model/medecin';
import { CategorieService } from '../../service/categorie.service';
import { NationaliteService } from '../../service/nationalite.service';
import { SpecialiteService } from '../../service/specialite.service';
import { ParametreService } from '../../service/parametre.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-add-medecin',
  templateUrl: './add-medecin.component.html',
  styles: [
  ]
})
export class AddMedecinComponent implements OnInit {
  parametre: any = {};
  listUser: any = [];
  valid: boolean = false;
  get f() { return this.crudApi.formData.controls }
  constructor(public crudApi: MedecinService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, private paraService: ParametreService,
    public categorieService: CategorieService,
    public specialiteService: SpecialiteService,
    public nationaliteService: NationaliteService,
    
    public dialogRef: MatDialogRef<AddMedecinComponent>) { }

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
       this.specialiteService.getAll().subscribe(
        response =>{this.specialiteService.list = response["hydra:member"];}
       );
       this.nationaliteService.getAll().subscribe(
        response =>{this.nationaliteService.list = response["hydra:member"];}
       );
       this.categorieService.getAll().subscribe(
        response =>{this.categorieService.list = response["hydra:member"];}
       );
  }
  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      matricule : ['', [Validators.required, Validators.minLength(3)]],
      nom : ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      dateNaissance : ['', [Validators.required, Validators.minLength(8)]],
      genre : ['', [Validators.required, Validators.minLength(3)]],
      adresse : ['', [Validators.required, Validators.minLength(8)]],
      ville : ['', [Validators.required, Validators.minLength(3)]],
      tel : ['', [Validators.required, Validators.minLength(8)]],
      gsm : ['', [Validators.required, Validators.minLength(8)]],
      email: [' ', [Validators.required, Validators.minLength(10)]],
      fax: ['', [Validators.required, Validators.minLength(8)]],
      specialite: ['', [Validators.required, Validators.minLength(3)]],
      categorie: ['', [Validators.required, Validators.minLength(3)]],
      nationalite: ['', [Validators.required, Validators.minLength(3)]],
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
    this.crudApi.formData.value.categorie= String( "/api/categories/"+this.crudApi.formData.value.categorie);
    this.crudApi.formData.value.specialite= String( "/api/specialites/"+this.crudApi.formData.value.specialite);
    this.crudApi.formData.value.nationalite= String( "/api/nationalites/"+this.crudApi.formData.value.nationalite);
    this.crudApi.createData(this.crudApi.formData.value).
      subscribe(data => {
        this.toastr.success('Validation Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response["hydra:member"]; }
        );

        this.router.navigate(['/clients']);
      });
  }
  updateData() {
    this.crudApi.formData.value.categorie= String( "/api/categories/"+this.crudApi.formData.value.categorie);
    this.crudApi.formData.value.specialite= String( "/api/specialites/"+this.crudApi.formData.value.specialite);
    this.crudApi.formData.value.nationalite= String( "/api/nationalites/"+this.crudApi.formData.value.nationalite);
    this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe(data => {
        this.toastr.success('Modification Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response["hydra:member"]; }
        );
        this.router.navigate(['/medecins']);
      });
  }

  
}
