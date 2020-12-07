import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';


export enum AuthActionTypes {
  LoginUser = '[Auth] LOGIN_USER',
  LoggedUser = '[Auth] LOGGED_USER',
  LoginError = '[Auth] LOGGED_ERROR',
  LoggedIn = '[Auth] LOGGED_IN',
  LoggedOut = '[Auth] LOGGED_OUT',

  Load = '[User] LOAD',
  LoadSuccess = '[User] LOAD SUCCESS',
  Edit   = '[User] EDIT',
  EditSuccess = '[User] EDIT SUCCESS',
  EditError = '[User] EDIT ERROR',

}

export class LoggedIn implements Action {
  readonly type = AuthActionTypes.LoggedIn;
  constructor(public payload: { isLogin: boolean }) { }
}

export class logOut implements Action {
  readonly type = AuthActionTypes.LoggedOut;
}

export class LoggedUser implements Action {
  readonly type = AuthActionTypes.LoggedUser;
  constructor(public payload: any) {
   }
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LoginUser;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: any) { }
}

export class Load implements Action {
  readonly type = AuthActionTypes.Load;
  constructor(public payload: any) {}
}
export class LoadSuccess implements Action {
  readonly type = AuthActionTypes.LoadSuccess;
  constructor(public payload: any) {}
}
export class Edit implements Action {
  readonly type = AuthActionTypes.Edit;
  constructor(public payload: User) {}
}

export class EditSuccess implements Action {
  readonly type = AuthActionTypes.EditSuccess;
  constructor(public payload: User) {}
}

export class EditError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: any) { }
}


export type actions = LoggedIn | logOut | LoginUser | LoginError | LoggedUser | Load | LoadSuccess | EditSuccess | Edit | EditError