import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Store , select} from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../store/app.states';
import { LoginUser } from '../../store/actions/auth.actions';

import * as Auth from '../../store/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   user: User = new User();
   getState: Observable<any>;
   errorMessage: string | null;
  
  constructor( private store: Store<AppState>) {  this.getState = this.store.select(selectAuthState); }

  ngOnInit(){
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  loginSend(){
    const payload ={ email: this.user.email,  password: this.user.password };

    this.store.dispatch(new LoginUser(payload));
  }

}
