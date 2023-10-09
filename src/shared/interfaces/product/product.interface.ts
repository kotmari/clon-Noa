import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest{
    category: ICategoryResponse;
    lebel:string
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath:string;
    count:number;
    isFavorite: false | true;
}

export interface IProductResponse extends IProductRequest{
    id: string;
}
