import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePage} from './profile-page';
import {ActivatedRoute} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {Component, Input} from '@angular/core';
import {UserGame} from '../../core/models/dto/user-game';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {EarnedTrophy} from '../../core/models/dto/earned-trophy';
import {User} from '../../core/models/dto/user';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let profileStoreSpy: jasmine.SpyObj<ProfileStore>;

  @Component({
    selector: 'app-profile-summary',
    template: ''
  })
  class MockProfileSummary {
    @Input({required: true}) profile: User = undefined!;
    @Input({required: true}) trophyCount: TrophyCount = {platinum: 0, gold: 0, silver: 0, bronze: 0};
  }

  @Component({
    selector: 'app-profile-game-list',
    template: ''
  })
  class MockProfileGameList {
    @Input({required: true}) gameList: UserGame[] = [];
  }

  @Component({
    selector: 'app-profile-trophy-list',
    template: ''
  })
  class MockProfileTrophyList {
    @Input({required: true}) trophyList: EarnedTrophy[] = [];
  }

  const userProfileId = '1';

  beforeEach(async () => {
    profileStoreSpy = jasmine.createSpyObj('ProfileStore', ['fetch', 'user', 'trophyCount', 'gameList', 'trophyList']);
    await TestBed.configureTestingModule({
      imports: [ProfilePage, MockProfileSummary, MockProfileGameList, MockProfileTrophyList],
      providers: [
        {provide: ProfileStore, useValue: profileStoreSpy},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => userProfileId}}}}
      ]
    })
      .compileComponents();

    TestBed.overrideComponent(ProfilePage, {
      set: {imports: [MockProfileSummary, MockProfileGameList, MockProfileTrophyList]}
    });

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on init', () => {
    expect(profileStoreSpy.fetch).toHaveBeenCalledWith(userProfileId);
  });

});
