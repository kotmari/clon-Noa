import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData
} from '@firebase/firestore';
import { IProductRequest } from 'src/shared/interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore

  ) { 
    this.productCollection = collection(this.afs, 'products');
    }
    

  getAllFirebaseProduct(){
    return collectionData(this.productCollection, {idField: 'id'})
  }

  async getAllByCategoryFirebase(name: string) {
    const productsRef = collection(this.afs, 'products');
    const querySnapshot = await getDocs(query(productsRef, where('category.path', '==', name)));
    const products: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id });
    });
    return products;
  }



  getOneFirebaseProduct(id: string | null){
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, {idField: 'id'})
  }

  createFirebaseProduct(product: IProductRequest){
    return addDoc(this.productCollection, product);
  }

  updateFirebaseProduct(product: IProductRequest, id: string){
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebaseProduct(id:string){
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }





}
