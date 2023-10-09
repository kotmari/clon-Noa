import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, DocumentData } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { IOrderRequest } from 'src/shared/interfaces/order/order.interface';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject<boolean>();
  public changeFavorit = new Subject<boolean>();

  private orderCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) { 
    this.orderCollection = collection(this.afs, 'orders')
  }

  getAllFirebaseOrder(){
    return collectionData(this.orderCollection, {idField: 'id'})
  }

  getOneFirebaseUserOrders(id:string){
    const userDocumentReference = doc(this.afs, `orders/${id}`);
    return (docData(userDocumentReference, {idField: 'id'}))
  }

  createFirebaseOrders(order: IOrderRequest){
    return addDoc(this.orderCollection, order);
  }

  updateFirebaseOrders(order: IOrderRequest, id: string){
    const orderDocumentReference = doc(this.afs, `orders/${id}`);
    return updateDoc(orderDocumentReference, {...order})
  }

  deleteFirebaseOrders(id: string){
    const orderDocumentReference = doc(this.afs, `orders/${id}`);
    return deleteDoc(orderDocumentReference)
  }




}
