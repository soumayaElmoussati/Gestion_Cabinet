import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { ListPatientComponent } from './patient/list-patient/list-patient.component';
import { ListMedecinComponent } from './medecin/list-medecin/list-medecin.component';
import { AddMedecinComponent } from './medecin/add-medecin/add-medecin.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { AddDomaineComponent } from './domaine/add-domaine/add-domaine.component';
import { ListDomaineComponent } from './domaine/list-domaine/list-domaine.component';
import { AddSpecialiteComponent } from './specialite/add-specialite/add-specialite.component';
import { ListSpecialiteComponent } from './specialite/list-specialite/list-specialite.component';
import { AddConsultationComponent } from './consultation/add-consultation/add-consultation.component';
import { ListConsultationComponent } from './consultation/list-consultation/list-consultation.component';
import { AddRdvComponent } from './rdv/add-rdv/add-rdv.component';
import { ListRdvComponent } from './rdv/list-rdv/list-rdv.component';
import { AddHoraireComponent } from './horaire/add-horaire/add-horaire.component';
import { ListHoraireComponent } from './horaire/list-horaire/list-horaire.component';
import { AddReglementComponent } from './reglement/add-reglement/add-reglement.component';
import { ListReglementComponent } from './reglement/list-reglement/list-reglement.component';
import { AddMedicamentComponent } from './medicament/add-medicament/add-medicament.component';
import { ListMedicamentComponent } from './medicament/list-medicament/list-medicament.component';
import { AddOrdonanceComponent } from './ordonance/add-ordonance/add-ordonance.component';
import { ListOrdonanceComponent } from './ordonance/list-ordonance/list-ordonance.component';
import { TemplateComponent } from './template/template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';

import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddAssureurComponent } from './assureur/add-assureur/add-assureur.component';
import { ListAssureurComponent } from './assureur/list-assureur/list-assureur.component';
import { ChartsModule } from 'ng2-charts';

import { AllChartComponent } from './statistique/all-chart/all-chart.component';
import { BarChartComponent } from './statistique/bar-chart/bar-chart.component';
import { LineChartComponent } from './statistique/line-chart/line-chart.component';

import { PieChartComponent } from './statistique/pie-chart/pie-chart.component';
import { RadarChartComponent } from './statistique/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './statistique/doughnut-chart/doughnut-chart.component';
import { AddInscriptionComponent } from './inscription/add-inscription/add-inscription.component';
import { ListInscriptionComponent } from './inscription/list-inscription/list-inscription.component';
import { AddLreglemntComponent } from './reglement/add-lreglemnt/add-lreglemnt.component';
import { SuiviComponent } from './patient/suivi/suivi.component';
const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,
    AddPatientComponent,
    ListPatientComponent,
    ListMedecinComponent,
    AddMedecinComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    AddDomaineComponent,
    ListDomaineComponent,
    AddSpecialiteComponent,
    ListSpecialiteComponent,
    AddConsultationComponent,
    ListConsultationComponent,
    AddRdvComponent,
    ListRdvComponent,
    AddHoraireComponent,
    ListHoraireComponent,
    AddReglementComponent,
    ListReglementComponent,
    AddMedicamentComponent,
    ListMedicamentComponent,
    AddOrdonanceComponent,
    ListOrdonanceComponent,
    TemplateComponent,
    AddAssureurComponent,
    ListAssureurComponent,
    AllChartComponent ,
    BarChartComponent,
    LineChartComponent,
  
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent,
    AddInscriptionComponent,
    ListInscriptionComponent,
    AddLreglemntComponent,
    SuiviComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    MatCardModule,
    ChartsModule
  ],
  exports : MATERIAL_MODULES,
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
