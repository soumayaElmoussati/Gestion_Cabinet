import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AllChartComponent } from './statistique/all-chart/all-chart.component';
import { BarChartComponent } from './statistique/bar-chart/bar-chart.component';
import { LineChartComponent } from './statistique/line-chart/line-chart.component';

import { PieChartComponent } from './statistique/pie-chart/pie-chart.component';
import { RadarChartComponent } from './statistique/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './statistique/doughnut-chart/doughnut-chart.component';
const routes: Routes = [
  {path: '', component:TemplateComponent,children : [
    {path: 'patient', component: AddPatientComponent},
    {path: 'patients', component: ListPatientComponent},
    {path: 'medecin', component: AddMedecinComponent},
    {path: 'medecins', component: ListMedecinComponent},
    {path: 'medicament', component: AddMedicamentComponent},
    {path: 'medicaments', component: ListMedicamentComponent},
    {path: 'ordonance', component: AddOrdonanceComponent},
    {path: 'ordonances', component: ListOrdonanceComponent},
    {path: 'reglement', component: AddReglementComponent},
    {path: 'reglements', component: ListReglementComponent},
    {path: 'consultation', component: AddConsultationComponent},
    {path: 'consultations', component: ListConsultationComponent},

    {path: 'horaire', component: AddHoraireComponent},
    {path: 'horaires', component: ListHoraireComponent},
    {path: 'rdv', component: AddRdvComponent},
    {path: 'rdvs', component: ListRdvComponent},
    {path: 'specialite', component: AddSpecialiteComponent},
    {path: 'specialites', component: ListSpecialiteComponent},
    {path: 'domaine', component: AddDomaineComponent},
    {path: 'domaines', component: ListDomaineComponent},
    {path: 'categorie', component: AddCategorieComponent},
    {path: 'categories', component: ListCategorieComponent},
   
  ]
},
  {path: 'charts', component: AllChartComponent},
  {path: 'lineChart', component: LineChartComponent},
  {path: 'pieChart', component: PieChartComponent},
  {path: 'radarChart', component: RadarChartComponent},
 
  {path: 'DoughChart', component: DoughnutChartComponent},
  {path: 'barChart', component: BarChartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
