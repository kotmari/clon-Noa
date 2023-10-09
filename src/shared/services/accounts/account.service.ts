import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore, setDoc, updateDoc
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { ILogin } from 'src/shared/interfaces/login/login.interface';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { IRegisterFull } from 'src/shared/interfaces/login/UserRegistr.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  private userCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore  ) { 
    this.userCollection = collection(this.afs, 'users')
  }


  getUsersFirebase(){
    return collectionData(this.userCollection, {idField: 'id'})
 }

 

getOneUserFirebase(id: string){
   const userDocumentReference = doc(this.afs, `users/${id}`);
   return (docData(userDocumentReference, {idField: 'id'}));
 }


 updateUserFirebase(user: ILogin, id: string) {
    return updateDoc(doc(this.afs, `users/${id}`), { ...user });
}

updateUser(userId: string, userData: any): Promise<void> {
  return updateDoc(doc(this.afs, `users/${userId}`), {...userData});
}

async updateUserData(userId: string, updatedFields: any): Promise<void> {
  const userDocRef = doc(this.afs, 'users', userId);
  await updateDoc(userDocRef, updatedFields);
}
}