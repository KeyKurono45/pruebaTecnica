import { Component, OnInit } from '@angular/core';
import { Store , select} from '@ngrx/store';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../store/app.states';
import { Edit } from '../../store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState> , private router: Router) {  
    this.getState = this.store.select(selectAuthState); 
  }

  ngOnInit(): void {
  }

  edit(){
    const id = localStorage.getItem('user');
    const payload = { id : Number(id), name: this.user.name, lastName : this.user.lastName, age: this.user.age } 
    this.store.dispatch(new Edit(payload));
  }
  cancel(){
    this.router.navigateByUrl('/home');
  }
}
