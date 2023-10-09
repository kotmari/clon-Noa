export interface IVacanciesRequest{
    name: string;
    title: string;
    description: string;
    imagePath: string
}

export interface IVacanciesResponse extends IVacanciesRequest {
    id: string;
}
