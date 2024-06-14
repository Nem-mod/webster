export interface User {
	_id: number;
	username: string;
	email: string;
	verified: boolean;
}

export interface IUserRegisterForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IUserAuthForm {
	email: string;
	password: string;
}

export interface IUserRegisterAndAuthRes {
	_id: number;
	email: string;
	username: string;
	verified: boolean;
}

export interface IUserUpdate {
	username: string;
}