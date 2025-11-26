import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {ProfileSummary} from '../../components/profile-summary/profile-summary';
import {ProfileGameList} from '../../components/profile-game-list/profile-game-list';
import {ProfileTrophyList} from '../../components/profile-trophy-list/profile-trophy-list';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileSummary,
    ProfileGameList,
    ProfileTrophyList
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
