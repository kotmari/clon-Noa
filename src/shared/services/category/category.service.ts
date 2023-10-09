import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, DocumentData } from 'firebase/firestore';
import { ICategoryRequest, IMarketRequest } from 'src/shared/interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;
  private marketCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) { 
    this.categoryCollection = collection(this.afs, 'categories');
    this.marketCollection = collection(this.afs, 'markets')
  }

  getAllFirebaseCategories(){
    return collectionData(this.categoryCollection, {idField: 'id'});
  }

  createFirebaseCategory(category: ICategoryRequest){
    return addDoc(this.categoryCollection, category);
  }


  updateFirebaseCategory(category: ICategoryRequest, id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebaseCategory(id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

  getAllFirebaseMarkets(){
    return collectionData(this.marketCollection, {idField: 'id'});
  }

  createFirebaseMarket(market: IMarketRequest){
    return addDoc(this.marketCollection, market);
  }

  
  updateFirebaseMarket(market: IMarketRequest, id: string){
    const marketDocumentReference = doc(this.afs, `markets/${id}`);
    return updateDoc(marketDocumentReference, {...market});
  }

  deleteFirebaseMarket(id: string){
    const marketDocumentReference = doc(this.afs, `markets/${id}`);
    return deleteDoc(marketDocumentReference);
  }

}
