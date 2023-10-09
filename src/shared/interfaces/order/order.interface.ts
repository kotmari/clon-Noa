import { IProductResponse } from "../product/product.interface";


export interface IOrderRequest{
    orderProduct: Array<IProductResponse>,
    firstName: string,
    lastName:string,
    phone:string,
    userCity: string,
    addressUser: string,
    addressPestoran: string,
    countDevices: 0,
    devices:string,
    onlinePayment: string,
    cash:string,
    delivery: string,
    data: string,
    status:string,
    call: string
}

export interface IOrderResponse extends IOrderRequest{
    id: string
}