import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { tap, map, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { AuthActionTypes, LoggedIn , logOut , LoggedUser , LoginUser ,LoginError , Load , LoadSuccess ,EditError, Edit, EditSuccess} from '../actions/auth.actions';



@Injectable({providedIn:'root'})
export class AuthEffects {
  keyToken
  constructor(
    private http : HttpClient,
    private actions: Actions,
    private authService: AuthService,
    private router : Router
  ) {  this.keyToken = '#FFFFFF';}
  
  @Effect({ dispatch: false })
  LoginUserError$ : Observable<Action> = this.actions.pipe(
    ofType<LoginError>(AuthActionTypes.LoginError),
    tap(value => console.log( 'Error auth', value.payload)),
    map(data => {
       return {type: 'Login error', payload: 'Email o password incorrecto'};
    })
  );

  @Effect()
  LoginUser$ : Observable<Action> = this.actions.pipe(
    ofType<LoginUser>(AuthActionTypes.LoginUser),
    tap(v => console.log(v)),
    map(action  => action.payload),
    exhaustMap(auth => {
      return this.authService.logIn(auth.email, auth.password).pipe(
        map(res => new LoggedUser(res)),
        catchError( err => of(new LoginError(err)))
      )
    })
  );

  @Effect({ dispatch: false })
  LoggedUser$: Observable<Action> = this.actions.pipe(
    ofType<LoggedUser>(AuthActionTypes.LoggedUser),
    tap(v => {
      console.log('logged  user payload' , v.payload);
      localStorage.setItem(this.keyToken,v.payload.access_token);
      localStorage.setItem('user',JSON.stringify(v.payload.position));
      this.router.navigateByUrl('/home');
    }),
    map( data => {
      return { type: '', payload: data}
    })
  
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LoggedOut),
    tap((user) => {
      localStorage.clear();
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  load$: Observable<Action> = this.actions.pipe(
    ofType<Load>(AuthActionTypes.Load),
    map(action  => action.payload),
    exhaustMap(auth => {
      return this.authService.loadUser(auth).pipe(
        map(res => new LoadSuccess(res)),
        catchError( err => of(new LoginError(err)))
      )
    })
  )

  @Effect({ dispatch: false })
  LoadSucces$: Observable<Action> = this.actions.pipe(
    ofType<LoadSuccess>(AuthActionTypes.LoadSuccess),
    tap(v => {console.log(v)}),
    map( data => {
      return { type: '', payload: data}
    })
  )

  @Effect({ dispatch: false })
  EditError$ : Observable<Action> = this.actions.pipe(
    ofType<EditError>(AuthActionTypes.EditError),
    tap(value => console.log( 'Error Update', value.payload)),
    map(data => {
       return {type: 'Update  error', payload: 'error conexion'};
    })
  );

  @Effect({ dispatch: false })
  EditSuccess$: Observable<Action> = this.actions.pipe(
    ofType<EditSuccess>(AuthActionTypes.EditSuccess),
    tap(v => {console.log(v)}),
    map( data => {
      this.router.navigateByUrl('/home');
      return { type: '', payload: data}
    })
  )

  @Effect()
  Edit$: Observable<Action> = this.actions.pipe(
    ofType<Edit>(AuthActionTypes.Edit),
    map(action  => action.payload),
    exhaustMap(auth => {
      return this.authService.editUser(auth.id , auth.name, auth.lastName, auth.age).pipe(
        map(res => new EditSuccess(res)),
        catchError( err => of(new EditError(err)))
      )
    })
  )
}
