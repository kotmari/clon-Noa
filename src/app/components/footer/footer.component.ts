import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/shared/services/category/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public navCategory: Array<ICategoryResponse>=[];

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.loadNavCategory();
  }


  loadNavCategory():void{
    this.categoryService.getAllFirebaseCategories().subscribe((data) => {
      this.navCategory = data as ICategoryResponse[];
    })
  }

}
