import {Component} from '@angular/core';
import {UserStore} from '../../core/store/user-store';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list-page',
  imports: [
    MatIconModule,
    MatCardModule,
    MatButton,
  ],
  templateUrl: './user-list-page.html',
  styleUrl: './user-list-page.scss',
})
export class UserListPage {

  constructor(public userStore: UserStore, private _router: Router) {
  }

  ngOnInit(): void {
    this.userStore.reset();
    this.userStore.search();
  }

  goToProfile(userProfileId: string) {
    this._router.navigate(['/profile', userProfileId]);
  }

}
