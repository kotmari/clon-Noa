import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/shared/services/category/category.service';
import { ImageService } from 'src/shared/services/image/image.service';
import { ProductService } from 'src/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public adminProduct: Array<IProductResponse> = [];
  public adminCategory: Array<ICategoryResponse> = [];

  public addForms = false;
  public isUploaded = false;
  public editStatus = false;
  public currentProductId!: string;

  public productForm!: FormGroup;


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private storage: Storage
    
  ){}

  ngOnInit(): void {
   this.initProductForm();
   this.loadCategories();
   this.loadProduct();
    
  }

  initProductForm(): void{
    this.productForm = this.fb.group({
      category:[null, Validators.required],
      name:[null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      isFavorite: [null, Validators.required],
      lebel:[null, Validators.required],
      weight: [null, Validators.required],
      imagePath: [null, Validators.required],
      count:[1]
    });
  }

  addForm(){
    this.addForms = !this.addForms;
  }

  loadCategories(): void{
    this.categoryService.getAllFirebaseCategories().subscribe(data =>{
      this.adminCategory = data as ICategoryResponse[];
    })
  }


  loadProduct(): void{
    this.productService.getAllFirebaseProduct().subscribe(data => {
      this.adminProduct = data as IProductResponse[];
    })
  }

  addProduct(){
    if(this.editStatus){
      this.productService.updateFirebaseProduct(this.productForm.value, this.currentProductId)
      .then(() =>{
        this.loadProduct();
      })
    }else{
      this.productService.createFirebaseProduct(this.productForm.value).then(()=>{
        this.loadProduct();
      })
    }
    this.editStatus = false;
    this.addForms = false;
    this.productForm.reset();
    this.isUploaded = false;
  }


  editProduct(product: IProductResponse){
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      price:product.price,
      isFavorite: product.isFavorite,
      lebel: product.lebel,
      weight: product.weight,
      description: product.description,
      imagePath: product.imagePath
    });
    this.editStatus = true;
    this.addForms = true;
    this.currentProductId = product.id;
    this.isUploaded = true;

  }
  deleteProduct(product: IProductResponse){
    this.productService.deleteFirebaseProduct(product.id).then(()=>{
      this.loadProduct();
    })
  }


  uploadProduct(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('image', file.name, file)
    .then(data => {
      this.productForm.patchValue({
        imagePath: data
      });
      this.isUploaded = true;
    })
    .catch(err => {console.log(err)})
  }



  async uploadFile(folder: string, name: string, file: File | null): Promise<string>{
    const path = `${folder}/${name}`;
    let url = '';
    if (file){
      try{
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      }catch(e:any){
        console.error(e);
      }
    }else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(()=>{
      console.log('File delete');
      this.isUploaded = false;
      this.productForm.patchValue({
        imagePath: null
      })

    })
  }

  valueByControl(control: string): string{
    return this.productForm.get(control)?.value;
  }
}
