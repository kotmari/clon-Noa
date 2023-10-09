export interface ICategoryRequest{
    name: string;
    path:string;
    imagePath: string;
}

export interface ICategoryResponse extends ICategoryRequest{
    id: string
}


export interface IMarketRequest{
    name: string;
    path:string;
    imagePath: string;
}

export interface IMarketResponse extends IMarketRequest{
    id: string
}

