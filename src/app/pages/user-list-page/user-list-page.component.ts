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
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.scss',
})
export class UserListPage {

  constructor(
    private readonly _router: Router,
    public readonly userStore: UserStore,
  ) {
  }

  ngOnInit(): void {
    this.userStore.reset();
    this.userStore.search();
  }

  goToProfile(userProfileId: string) {
    this._router.navigate(['/profile', userProfileId]).then(() => console.info(`Navigated to profile page: ${userProfileId}`));
  }

}
