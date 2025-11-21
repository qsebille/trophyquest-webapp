import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../profile-summary/profile-summary';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileSummary
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {
  userProfileId!: string | null;

  constructor(private _route: ActivatedRoute, public profileStore: ProfileStore) {
  }

  ngOnInit(): void {
    this.userProfileId = this._route.snapshot.paramMap.get('userProfileId');
    this.profileStore.fetch(this.userProfileId);
  }
}
