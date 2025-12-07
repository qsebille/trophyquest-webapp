import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilePage} from './profile-page';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../core/store/profile-store';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrophyCount} from '../../core/models/dto/trophy-count';
import {Player} from '../../core/models/dto/player';
import {PlayerCollection} from '../../core/models/dto/player-collection';
import {Trophy} from '../../core/models/dto/trophy';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let profileStoreSpy: jasmine.SpyObj<ProfileStore>;
  let routerSpy: jasmine.SpyObj<Router>;

  @Component({selector: 'app-profile-summary', template: ''})
  class MockProfileSummary {
    @Input({required: true}) player!: Player;
    @Input({required: true}) trophyCount!: TrophyCount;
    @Input({required: true}) totalGamesPlayed!: number;
    @Input({required: true}) totalEarnedTrophies!: number;
  }

  @Component({selector: 'app-profile-game-card', template: ''})
  class MockProfileGameCard {
    @Input({required: true}) collection!: PlayerCollection;
    @Output() public readonly clickOnTitle = new EventEmitter();
  }

  @Component({selector: 'app-profile-trophy-card', template: ''})
  class MockProfileTrophyCard {
    @Input({required: true}) trophy!: Trophy;
  }

  const mockPlayerId = '000';

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    profileStoreSpy = jasmine.createSpyObj('ProfileStore', [
      'reset', 'retrieve',
      'player', 'trophyCount', 'totalPlayedGames', 'totalEarnedTrophies',
      'collections', 'searchCollections', 'loadMoreCollections', 'hasMoreCollections', 'hasNoCollections', 'isLoadingCollections', 'hasErrorLoadingCollections',
      'trophies', 'searchTrophies', 'loadMoreTrophies', 'hasMoreTrophies', 'hasNoTrophies', 'isLoadingTrophies', 'hasErrorLoadingTrophies',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProfilePage, MockProfileSummary, MockProfileGameCard, MockProfileTrophyCard],
      providers: [
        {provide: ProfileStore, useValue: profileStoreSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => mockPlayerId}}}}
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

  it('should fetch profile informations on init', () => {
    expect(profileStoreSpy.reset).toHaveBeenCalled();
    expect(profileStoreSpy.retrieve).toHaveBeenCalledWith(mockPlayerId);
    expect(profileStoreSpy.searchCollections).toHaveBeenCalledWith(mockPlayerId);
    expect(profileStoreSpy.searchTrophies).toHaveBeenCalledWith(mockPlayerId);
  });

  it('should navigate to game page when clicking on game card', () => {
    const mockTrophyCount: TrophyCount = {platinum: 1, gold: 2, silver: 3, bronze: 4};
    const mockPlayerCollection: PlayerCollection = {
      collectionId: 'collection-123',
      collectionTitle: '',
      collectionPlatform: '',
      collectionImageUrl: '',
      gameId: 'game-456',
      gameTitle: '',
      gameImageUrl: '',
      collectionTrophies: mockTrophyCount,
      earnedTrophies: mockTrophyCount,
    }
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    component.navigateToGamePage(mockPlayerCollection);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(
      ['/game', mockPlayerCollection.gameId],
      {queryParams: {collectionId: mockPlayerCollection.collectionId, playerId: mockPlayerId}}
    );
  });

});
