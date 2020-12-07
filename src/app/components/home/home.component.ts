import { Component, OnInit } from '@angular/core';
import { Store , select} from '@ngrx/store';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../store/app.states';
import { logOut, Load } from '../../store/actions/auth.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User ;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState> , private router : Router) {  
    this.getState = this.store.select(selectAuthState); 
  }

  ngOnInit(): void {
    const id = localStorage.getItem('user')
    this.store.dispatch(new Load(id));
    }

  logOut(){
    this.store.dispatch(new logOut());
  }
  edit(){
    this.router.navigateByUrl('/edit');
  }
}
