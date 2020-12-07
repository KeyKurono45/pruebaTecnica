import { User } from '../../models/user';
import * as AuthAction from  '../actions/auth.actions';
import { AuthActionTypes } from  '../actions/auth.actions';

export interface State {
    authenticated: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
  }

  export const initialState: State = {
    authenticated: false,
    token : null,
    user: null,
    error: null
  };

  export function reducer (state = initialState , action: AuthAction.actions){
    console.log(action)
    switch(action.type){
      case AuthActionTypes.LoggedIn: 
        return action;
      case AuthActionTypes.LoggedUser:
        return {
          ...state,
          authenticated: true,
          token: action.payload
        } 
        case AuthActionTypes.LoginError: {
          return {
            ...state,
            errorMessage: 'Datos incorrectos'
          };
        }
        case AuthActionTypes.LoggedOut: {
          return initialState;
        }
        case AuthActionTypes.Load : {
          return action
        }
        case AuthActionTypes.LoadSuccess:
          return {
            ...state,
            authenticated: true,
            user: {
              email : action.payload.userFind.email,
              name: action.payload.userFind.name,
              lastName : action.payload.userFind.lastName,
              age: action.payload.userFind.age,
            },
          } 
          case AuthActionTypes.Edit : {
            return action
          }
          case AuthActionTypes.EditSuccess:
            return {
              ...state,
              authenticated: false,
            } 
            case AuthActionTypes.EditSuccess:
              return {
                ...state,
                errorMessage: 'Fallos en conexión'
              } 
        default : return state; 
    }
  }


  export const getAuthState = (state: State) => state.user;
  export const getAction  = (action: any) => action.user;
  export const getError  = (state: State) => state.error;
