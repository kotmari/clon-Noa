import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVacanciesRequest } from 'src/shared/interfaces/vacancies/vacancies.interface';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore, updateDoc
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  public vacancieCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.vacancieCollection = collection(this.afs, 'vacancies')
   }

getAllFirebaseVacancies(){
  return collectionData(this.vacancieCollection, {idField: 'id'});
}

getOneFirebaseVacancies(id: string){
  const vacancieDocumentReference = doc(this.afs, `vacancies/${id}`);
  return docData(vacancieDocumentReference, {idField: 'id'});
}


createFirebaseVacancies(vacancie: IVacanciesRequest){
  return addDoc(this.vacancieCollection, vacancie);
}

updateFirebaseVacancies(vacancie: IVacanciesRequest, id:string){
  const vacancieDocumentReference = doc(this.afs, `vacancies/${id}`);
  return updateDoc(vacancieDocumentReference, {...vacancie});
}


deleteFirebaseVacancies(id: string){
  const vacancieDocumentReference = doc(this.afs, `vacancies/${id}`);
  return deleteDoc(vacancieDocumentReference);
}


}
