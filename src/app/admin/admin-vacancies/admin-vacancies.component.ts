import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { IVacanciesResponse } from 'src/shared/interfaces/vacancies/vacancies.interface';
import { VacanciesService } from 'src/shared/services/vacancies/vacancies.service';

@Component({
  selector: 'app-admin-vacancies',
  templateUrl: './admin-vacancies.component.html',
  styleUrls: ['./admin-vacancies.component.scss']
})


export class AdminVacanciesComponent implements OnInit {
  public adminVacancies: Array<IVacanciesResponse> = [];

  public addForms = false;
  public isUploaded = false;
  public editStatus = false;
  public currentVacancieId!: string;

  public vacanciesForm!: FormGroup;


  constructor(
    private vacanciesService: VacanciesService,
    private fb: FormBuilder,
    private storage: Storage
    
  ){}

  ngOnInit(): void {
   this.initVacancieForm();
   this.loadVacancies();
    
  }

  initVacancieForm(): void{
    this.vacanciesForm = this.fb.group({
      name:[null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  addForm(){
    this.addForms = !this.addForms;
  }

  loadVacancies(): void{
    this.vacanciesService.getAllFirebaseVacancies().subscribe(data => {
      this.adminVacancies = data as IVacanciesResponse[];
    })
  }

  addVacancie(){
    if(this.editStatus){
      this.vacanciesService.updateFirebaseVacancies(this.vacanciesForm.value, this.currentVacancieId)
      .then(() =>{
        this.loadVacancies();
      })
    }else{
      this.vacanciesService.createFirebaseVacancies(this.vacanciesForm.value).then(()=>{
        this.loadVacancies();
      })
    }
    this.editStatus = false;
    this.addForms = false;
    this.vacanciesForm.reset();
    this.isUploaded = false;
  }


  editVacancie(vacancie: IVacanciesResponse){
    this.vacanciesForm.patchValue({
      name: vacancie.name,
      title: vacancie.title,
      description: vacancie.description,
      imagePath: vacancie.imagePath
    });
    this.editStatus = true;
    this.addForms = true;
    this.currentVacancieId = vacancie.id;
    this.isUploaded = true;

  }
  deleteVacancie(vacancie: IVacanciesResponse){
    this.vacanciesService.deleteFirebaseVacancies(vacancie.id).then(()=>{
      this.loadVacancies();
    })
  }

  upload(event: any): void{
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data => {
      this.vacanciesForm.patchValue({
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
      this.vacanciesForm.patchValue({
        imagePath: null
      })

    })
  }

  valueByControl(control: string): string{
    return this.vacanciesForm.get(control)?.value;
  }

}
