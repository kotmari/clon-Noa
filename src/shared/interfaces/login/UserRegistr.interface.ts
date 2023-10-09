export interface IUserRegistr{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmedPassword?: string;
}

export interface IRegisterFull extends IUserRegistr {
    address: string;
    order: []
  }