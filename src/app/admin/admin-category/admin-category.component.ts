import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/shared/services/category/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  displayedColumns: string[] = ['id', 'name', 'path', 'imagePath', 'buttom'];
  
  public addForms = false;
  public isUploaded = false;
  public editStatus = false;
  public currentCategoryId!: string;

  public categoryForm!: FormGroup;


  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ){}

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void{
    this.categoryForm = this.fb.group({
      name:[null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void{
    this.categoryService.getAllFirebaseCategories().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }


  addForm():void{
    this.addForms = !this.addForms;
  }


  addCategory(): void{
    if(this.editStatus){
      this.categoryService.updateFirebaseCategory(this.categoryForm.value, this.currentCategoryId).then(() => {
        this.loadCategories();
      })
    }else{
      this.categoryService.createFirebaseCategory(this.categoryForm.value).then(()=>{
        this.loadCategories(); 
      })
    }
    this.editStatus = false;
    this.addForms = false;
    this.categoryForm.reset();
    this.isUploaded=false;
  }
  

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path:category.path,
      imagePath: category.imagePath
    })
    this.editStatus=true;
    this.addForms = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;

  }


  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.deleteFirebaseCategory(category.id).then(() => {
      this.loadCategories();
    })
  }

  
  upload(event: any): void{
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data => {
      this.categoryForm.patchValue({
        imagePath: data
      });
      this.isUploaded = true;
    })
    .catch(err => {
      console.log(err);
    });
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
      this.categoryForm.patchValue({
        imagePath: null
      })

    })
  }

  valueByControl(control: string): string{
    return this.categoryForm.get(control)?.value;
  }





}
