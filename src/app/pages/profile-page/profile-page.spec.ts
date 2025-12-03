import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePage} from './profile-page';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {User} from '../../core/models/dto/user';
import {UserGame} from '../../core/models/dto/user-game';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let profileStoreSpy: jasmine.SpyObj<ProfileStore>;
  let routerSpy: jasmine.SpyObj<Router>;

  @Component({selector: 'app-profile-summary', template: ''})
  class MockProfileSummary {
    @Input({required: true}) profile: User = undefined!;
    @Input({required: true}) trophyCount: TrophyCount = {platinum: 0, gold: 0, silver: 0, bronze: 0};
  }

  @Component({selector: 'app-profile-game-card', template: ''})
  class MockProfileGameCard {
    @Input({required: true}) game!: UserGame;
    @Output() public readonly gameClicked = new EventEmitter<{ gameId: string, collectionId: string }>();
  }

  @Component({selector: 'app-profile-trophy-card', template: ''})
  class MockProfileTrophyCard {
  }

  const userProfileId = '1';

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    profileStoreSpy = jasmine.createSpyObj('ProfileStore', [
      'reset',
      'fetch',
      'searchGames',
      'loadMoreGames',
      'searchTrophies',
      'loadMoreTrophies',
      'user',
      'trophyCount',
      'gameResults',
      'hasMoreGames',
      'isLoadingGames',
      'trophyResults',
      'hasMoreTrophies',
      'isLoadingTrophies',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProfilePage, MockProfileSummary, MockProfileGameCard, MockProfileTrophyCard],
      providers: [
        {provide: ProfileStore, useValue: profileStoreSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => userProfileId}}}}
      ]
    }).compileComponents();

    TestBed.overrideComponent(ProfilePage, {
      set: {imports: [MockProfileSummary, MockProfileSummary, MockProfileGameCard, MockProfileTrophyCard]}
    });

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile on init', () => {
    expect(profileStoreSpy.reset).toHaveBeenCalled();
    expect(profileStoreSpy.fetch).toHaveBeenCalledWith(userProfileId);
    expect(profileStoreSpy.searchGames).toHaveBeenCalledWith(userProfileId);
    expect(profileStoreSpy.searchTrophies).toHaveBeenCalledWith(userProfileId);
  });

  it('should navigate to game page when clicking on game card', () => {
    const mockedTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const event: { gameId: string, collectionId: string } = {
      gameId: '123',
      collectionId: 'collection-456',
    };
    const game: UserGame = {
      id: event.gameId,
      title: 'Game 1',
      imageUrl: 'game.png',
      earnedTrophies: mockedTrophyCount,
      totalTrophies: mockedTrophyCount,
      trophyCollections: []
    };
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    component.navigateToGamePage(event);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(
      ['/game', game.id],
      {queryParams: {collectionId: event.collectionId, userId: userProfileId}}
    );
  });

});
