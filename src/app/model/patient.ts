import { Medecin } from "./medecin";

export class Patient {
    id !: number;
    code!: string;
    nom !: string; 
    prenom !: string;
    dateNaissance !: any;
    adresse !: string;
    ville !: string;
    tel !: string;
    gsm !: string;
    email !: string;
    genre ! :string;
    etatCivil !: string;
    nbrEnfant !: number;
    nomConjoint !: string;
    lienParente !: string;
    taille !: number;
    poids!: number;
    grSanguin!: string;
    nationalite!: string;
    profession !: string;
    identUnique !: string;
    priseEncharge !: string;
    medecin !: number;
    datepCons !: string;
    dateDcons !: string;
    motcles!: string;
    codeApci !: string;
    regieCnam !: any;
    datevalidite!: string;
    domaine !: number;
    assureur !: number;
 }
