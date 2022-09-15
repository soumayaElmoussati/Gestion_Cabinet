import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { DomaineService } from '../../service/domaine.service';
import { NationaliteService } from '../../service/nationalite.service';
import { AssureurService } from '../../service/assureur.service';
import { MedecinService } from '../../service/medecin.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Router } from '@angular/router';

import { ParametreService } from '../../service/parametre.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  parametre: any = {};
  listUser: any = [];
  valid: boolean = false;
  get f() { return this.crudApi.formData.controls }
  constructor(public crudApi: PatientService, public fb: FormBuilder, public toastr: ToastrService,
    private router: Router, private paraService: ParametreService,
    public domaineService: DomaineService,
    public medecinService: MedecinService,
    public nationaliteService: NationaliteService,
    public assureurService: AssureurService,
    public dialogRef: MatDialogRef<AddPatientComponent>) { }

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
    this.domaineService.getAll().subscribe(  
      response =>{
      
        this.domaineService.list = response["hydra:member"];
      }
    );
      
    this.domaineService.getAll().subscribe(
      response =>{this.domaineService.list = response["hydra:member"];}
    );
    this.medecinService.getAll().subscribe(
        response =>{this.medecinService.list = response["hydra:member"];}
    );
    this.assureurService.getAll().subscribe(
      response =>{this.assureurService.list = response["hydra:member"];} 
    );
    this.nationaliteService.getAll().subscribe(
      response =>{this.nationaliteService.list = response["hydra:member"];}
    );
 
  }
  infoForm() {
    this.crudApi.formData = this.fb.group({
      id: null,
      code : ['', [Validators.required]],
      nom : ['', [Validators.required]],
      nationalite : ['', [Validators.required]],
      prenom: ['', [Validators.required, Validators.minLength(5)]],
      lieu : ['', [Validators.required]],
      email : ['', [Validators.required]],
      etatCivil : ['', [Validators.required]],
      lienParente : ['', [Validators.required]],
      identUnique:['', [Validators.required]],
      identcles:['', [Validators.required]],
      datevalidite:['', [Validators.required]],
      dateNaissance : ['', [Validators.required, Validators.minLength(8)]],
      adresse : ['', [Validators.required, Validators.minLength(8)]],
      ville : ['', [Validators.required, Validators.minLength(8)]],
      tel : ['', [Validators.required, Validators.minLength(8)]],
      gsm : ['', [Validators.required, Validators.minLength(8)]],
      genre : ['', [Validators.required]],
      nbrEnfant: ['', [Validators.required]],
      nomConjoint: ['', [Validators.required]],
      poids: ['', [Validators.required]],
      taille: ['', [Validators.required]],
      grSanguin: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      domaine: ['', [Validators.required]],
      priseEncharge: ['', [Validators.required]],
      medecin: ['', [Validators.required]],
      motcles: ['', [Validators.required]],
      codeApci: ['', [Validators.required]],
      regimeCnam: ['', [Validators.required]],
      assureur: ['', [Validators.required]],

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
    this.crudApi.formData.value.nationalite= String( "/api/nationalites/"+this.crudApi.formData.value.nationalite);
    this.crudApi.formData.value.medecin= String( "/api/medecins/"+this.crudApi.formData.value.medecin);
    this.crudApi.formData.value.assureur= String( "/api/assureurs/"+this.crudApi.formData.value.assureur);
    this.crudApi.formData.value.domaine= String( "/api/domaines/"+this.crudApi.formData.value.domaine);
   /* this.crudApi.formData.value.rdvs=[];
    this.crudApi.formData.value.consultations=[];
    this.crudApi.formData.value.reglements=[];*/
    this.crudApi.formData.value.nbrEnfant=parseInt(this.crudApi.formData.value.nbrEnfant);
    this.crudApi.formData.value.poids=parseInt(this.crudApi.formData.value.poids);
    this.crudApi.formData.value.taille=parseInt(this.crudApi.formData.value.taille);
    console.log(this.crudApi.formData.value)
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
    this.crudApi.formData.value.nationalite= String( "/api/nationalites/"+this.crudApi.formData.value.nationalite);
    this.crudApi.formData.value.medecin= String( "/api/medecins/"+this.crudApi.formData.value.medecin);
    this.crudApi.formData.value.assureur= String( "/api/assureurs/"+this.crudApi.formData.value.assureur);
    this.crudApi.formData.value.domaine= String( "/api/domaines/"+this.crudApi.formData.value.domaine);
    this.crudApi.formData.value.rdvs=[];
    this.crudApi.formData.value.consultations=[];
    this.crudApi.formData.value.reglements=[];
    this.crudApi.updatedata(this.crudApi.formData.value.id, this.crudApi.formData.value).
      subscribe(data => {

        this.toastr.success('Modification Faite avec Success');
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response["hydra:member"]; }
        );
        this.router.navigate(['/patients']);
      });
  }
  onChange($event:any){}
    
}
